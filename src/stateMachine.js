import { Machine, State, actions, assign, send, sendParent, interpret, spawn } from "xstate";

const isProd = true;

const allRoles = {
  5: ["L", "L", "L", "F", "H"],
  6: ["L", "L", "L", "L", "F", "H"],
  7: ["L", "L", "L", "L", "F", "F", "H"],
  8: ["L", "L", "L", "L", "L", "F", "F", "H"],
  9: ["L", "L", "L", "L", "L", "F", "F", "F", "H"],
  10: ["L", "L", "L", "L", "L", "L", "F", "F", "F", "H"]
};

const allPolicyCards = [
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "F",
  "F",
  "F",
  "F",
  "F",
  "F",
  "F",
  "F",
  "F",
  "F",
  "F"
];

const ability = {
  NONE: "NONE",
  TOP_THREE_CARD: "TOP_THREE_CARD",
  KILL_PLAYER: "KILL_PLAYER",
  INVESTIGATE: "INVESTIGATE",
  PICK_NEXT_PRESIDENT: "PICK_NEXT_PRESIDENT",
  FASCIST_VICTORY: "FASCIST_VICTORY"
};

const boardFor = {
  6: [
    ability.NONE,
    ability.NONE,
    ability.TOP_THREE_CARD,
    ability.KILL_PLAYER,
    ability.KILL_PLAYER,
    ability.FASCIST_VICTORY
  ],
  8: [
    ability.NONE,
    ability.INVESTIGATE,
    ability.PICK_NEXT_PRESIDENT,
    ability.KILL_PLAYER,
    ability.KILL_PLAYER,
    ability.FASCIST_VICTORY
  ],
  10: [
    ability.INVESTIGATE,
    ability.INVESTIGATE,
    ability.PICK_NEXT_PRESIDENT,
    ability.KILL_PLAYER,
    ability.KILL_PLAYER,
    ability.FASCIST_VICTORY
  ]
};

export const prodInitialState = {
  value: "play",
  context: {
    players: [],
    board: [],
    drawPile: [],
    policiesInHand: [],
    electionTracker: 0,
    prevPresidentIndex: null,
    prevChancellorIndex: null,
    presidentIndex: null,
    chancellorIndex: null,
    enactedLiberalPolicies: 0,
    enactedFascistPolicies: 0,
    vetoRequested: null,
    vetoApproved: null
  }
};

const filterCardsInitialState = {
  "context": {
    "chancellorIndex": null,
    "board": [
      ability.NONE,
      ability.NONE,
      ability.TOP_THREE_CARD,
      ability.KILL_PLAYER,
      ability.KILL_PLAYER
    ],
    "drawPile": ["L", "F", "L", "F", "L", "F", "L", "F", "L", "F", "L", "F", "F", "F"],
    "enactedFascistPolicies": 0,
    "enactedLiberalPolicies": 0,
    "players": [
      {
        "displayName": "bob",
        "id": 1,
        "role": "L",
        "vote": true
      },
      {
        "displayName": "john",
        "id": 2,
        "role": "H",
        "vote": true
      },
      {
        "displayName": "amanda",
        "id": 3,
        "role": "L",
        "vote": true
      },
      {
        "displayName": "lisa",
        "id": 4,
        "role": "F",
        "vote": true
      },
      {
        "displayName": "vivian",
        "id": 5,
        "role": "L",
        "vote": true
      },
      {
        "displayName": "tina",
        "id": 6,
        "role": "L",
        "vote": true
      }
    ],
    "policiesInHand": ["F", "F", "F"],
    "presπidentIndex": 0,
    "prevChancellorIndex": null,
    "prevPresidentIndex": null,
    "vetoRequested": null,
    "vetoApproved": null
  },
  "value": "filterCards"
};

const initial = isProd ? prodInitialState : filterCardsInitialState;

// Fisher-Yates shuffle.
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const setBoardToUse = assign({
  board: (context) =>
    context.players.length <= 6
      ? boardFor[6]
      : context.players.length <= 8
      ? boardFor[8]
      : boardFor[10]
});

const setNewChancellor = assign({
  chancellorIndex: (context) => context.chancellorCandidateIndex,
  chancellorCandidateIndex: null,
  players: (context) => context.players.map((p) => ({ ...p, vote: null }))
});

const setNewChancellorCandidate = assign({
    chancellorCandidateIndex: (_, event) => event.index,
    players: (context) => context.players.map((p) => ({ ...p, vote: null }))
})

const setNewPresident = assign((context, action) => {
  const randomStartIndex = Math.floor(Math.random()*context.players.length);
  let presidentIndex =
    context.presidentIndex === null ? randomStartIndex : (context.presidentIndex + 1) % context.players.length;

  while (!context.players[presidentIndex].isActive) {
    presidentIndex = (presidentIndex + 1) % context.players.length;
  }

  if (action.type !== "killPlayer" && action.index) {
    presidentIndex = action.index;
  }

  return {
    prevPresidentIndex: context.presidentIndex,
    policiesInHand: [],
    presidentIndex
  };
});

const setOneVote = assign((context, event) => ({
  players: context.players.map((p) => {
    return p.id === event.id
      ? { ...p, vote: typeof event.value === "boolean" ? event.value : null }
      : p;
  })
}));

const setPlayerRoles = assign({
  players: (context, event) => {
    const l = context.players.length;
    const roles = allRoles[l];
    shuffle(roles);
    return context.players.map((p, index) => ({
      ...p,
      role: roles[index],
      vote: null
    }));
  }
});

const setNewDrawPile = assign({
  drawPile: () => {
    const cards = [...allPolicyCards];
    shuffle(cards);
    return cards;
  }
});

const setPolicyInHand = assign((context) => {
  let newDrawPile;

  const reshuffle = () => {
    const libralArray = Array(6 - context.enactedLiberalPolicies).fill("L");
    const fascistArray = Array(11 - context.enactedFascistPolicies).fill("F");
    newDrawPile = libralArray.concat(fascistArray);
    shuffle(newDrawPile);
  };

  if (context.drawPile && context.drawPile.length >= 3) {
    newDrawPile = [...context.drawPile];
  } else {
    reshuffle();
  }

  const newPoliciesInHand = [newDrawPile.pop(), newDrawPile.pop(), newDrawPile.pop()];

  return {
    drawPile: newDrawPile,
    policiesInHand: newPoliciesInHand,
    vetoRequested: null,
    vetoApproved: null
  };
});

const setNewPolicy = assign((context, action) => {
  let newDrawPile = [...context.drawPile];

  const reshuffle = ([f, l]) => {
    const libralArray = Array(6 - context.enactedLiberalPolicies - l).fill("L");
    const fascistArray = Array(11 - context.enactedFascistPolicies - f).fill("F");
    newDrawPile = libralArray.concat(fascistArray);
    shuffle(newDrawPile);
  };

  if (context.policiesInHand[action.index] === "F") {
    if (context.drawPile.length < 3) {
      reshuffle([1, 0]);
    }
    return {
      prevChancellorIndex: context.chancellorIndex,
      policiesInHand: [],
      chancellorIndex: null,
      enactedFascistPolicies: context.enactedFascistPolicies + 1,
      drawPile: newDrawPile,
      newestPolicy: "F"
    };
  }

  if (context.drawPile.length < 3) {
    reshuffle([0, 1]);
  }
  return {
    prevChancellorIndex: context.chancellorIndex,
    policiesInHand: [],
    chancellorIndex: null,
    enactedLiberalPolicies: context.enactedLiberalPolicies + 1,
    drawPile: newDrawPile,
    newestPolicy: "L"
  };
});

const setNewPlayer = assign((context, action) => ({
  players: [
    ...context.players,
    {
      id: action.id,
      displayName: action.displayName,
      vote: null,
      role: null,
      isActive: true,
      color: action.color
    }
  ]
}));

const setRemovePlayer = assign((context, action) => ({
  players: context.players.map((p) => (p.id === action.id ? { ...p, isDisconnected: true } : p))
}));

const setReconnectPlayer = assign((context, action) => ({
  players: context.players.map((p) => (p.id === action.id ? { ...p, isDisconnected: false } : p))
}));

const removePolicyFromHand = assign((context, action) => ({
  policiesInHand: context.policiesInHand.filter((item, index) => {
    return index !== action.index;
  })
}));

const killPlayer = assign((context, event) => ({
  players: context.players.map((p, i) => (i !== event.index ? p : { ...p, isActive: false }))
}));

const requestVeto = assign(() => ({
  vetoRequested: true
}));

const approveVeto = assign(() => ({
  vetoApproved: true
}));

const rejectVeto = assign(() => ({
  vetoApproved: false
}));

const incrementElectionTracker = assign((context) => ({
  electionTracker: context.electionTracker + 1
}));

const resetElectionTracker = assign(() => ({
  electionTracker: 0
}));

const resetTermLimits = assign(() => ({
  prevChancellorIndex: null,
  prevPresidentIndex: null
}));

const enactRandomPolicy = assign((context) => {
  let newDrawPile;
  if (context.drawPile && context.drawPile.length >= 3) {
    newDrawPile = [...context.drawPile];
  } else {
    newDrawPile = [...allPolicyCards];
    shuffle(newDrawPile);
  }

  const topPolicyCard = newDrawPile.pop();

  return {
    drawPile: newDrawPile,
    enactedFascistPolicies:
      topPolicyCard === "F" ? context.enactedFascistPolicies + 1 : context.enactedFascistPolicies,
    enactedLiberalPolicies:
      topPolicyCard === "L" ? context.enactedLiberalPolicies + 1 : context.enactedLiberalPolicies
  };
});

function isElectionSuccess(context) {
  const result =
    isAllVotesIn(context) &&
    context.players
      .filter((p) => p.isActive)
      .reduce((acc, cur) => (cur.vote ? acc + 1 : acc - 1), 0) > 0;
  return result;
}

function isValidGovernmentCandidate(context, event) {
  const alivePlayerCount = context.players.filter((p) => p.isActive).length;
  const canPrevPresidentBeNominated = alivePlayerCount <= 5;

  return (
    context.players[event.index].isActive &&
    event.index !== context.prevChancellorIndex &&
    event.index !== context.presidentIndex &&
    (canPrevPresidentBeNominated || event.index !== context.prevPresidentIndex)
  );
}

function isValidKillingCandidate(context, event) {
  return context.players[event.index].isActive;
}

function isAllVotesIn(context) {
  const result =
    context.players.filter((p) => typeof p.vote !== "boolean" && p.isActive).length === 0;
  return result;
}

function isEnoughPlayers(context) {
  const count = context.players.length;
  return count >= 5 && count <= 10;
}

function isLiberalWin(context, action) {
  const hitler = context.players.filter((p) => p.role === "H")[0];
  return context.enactedLiberalPolicies === 5 || (hitler && !hitler.isActive);
}

function isFascistWin(context) {
  const isHitlerElected =
    context.enactedFascistPolicies > 3 &&
    typeof context.chancellorIndex === "number" &&
    context.players[context.chancellorIndex].role === "H";

  const isFascistPoliciesEnacted = context.enactedFascistPolicies === 6;

  return isHitlerElected || isFascistPoliciesEnacted;
}

function isViewThreeCards(context, event) {
  if (context.newestPolicy === "L") {
    return false;
  }
  return context.board[context.enactedFascistPolicies - 1] === ability.TOP_THREE_CARD;
}
function isPickNextPresident(context, event) {
  if (context.newestPolicy === "L") {
    return false;
  }
  return context.board[context.enactedFascistPolicies - 1] === ability.PICK_NEXT_PRESIDENT;
}

function isKillPlayer(context, event) {
  if (context.newestPolicy === "L") {
    return false;
  }
  return context.board[context.enactedFascistPolicies - 1] === ability.KILL_PLAYER;
}

function isInvestigate(context, event) {
  if (context.policiesInHand[event.index] === "L") {
    return false;
  }
  return context.board[context.enactedFascistPolicies] === ability.INVESTIGATE;
}

function isVetoAvailable(context) {
  return context.enactedFascistPolicies === 5 && context.vetoApproved === null;
}

function isVetoRequested(context) {
  return context.vetoRequested;
}

function isTooManyFailedElections(context) {
  return context.electionTracker === 2;
}

const stateMachine = Machine(
  {
    id: "secret-hitler",
    initial: "play",
    context: initial.context,
    states: {
      play: {
        initial: "waiting",
        always: [
          {
            target: "liberalWin",
            cond: "isLiberalWin"
          },
          {
            target: "fascistWin",
            cond: "isFascistWin"
          }
        ],
        states: {
          waiting: {
            on: {
              newPlayer: {
                target: "waiting",
                actions: "setNewPlayer"
              },
              removePlayer: {
                target: "waiting",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "waiting",
                actions: "setReconnectPlayer"
              },
              start: {
                target: "chancellorSelection",
                cond: "isEnoughPlayers",
                actions: ["setPlayerRoles", "setNewPresident", "setNewDrawPile", "setBoardToUse"]
              }
            }
          },
          chancellorSelection: {
            on: {
              removePlayer: {
                target: "chancellorSelection",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "chancellorSelection",
                actions: "setReconnectPlayer"
              },
              selectChancellor: {
                target: "election",
                actions: "setNewChancellorCandidate",
                cond: "isValidGovernmentCandidate"
              }
            }
          },
          election: {
            on: {
              removePlayer: {
                target: "election",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "election",
                actions: "setReconnectPlayer"
              },
              vote: {
                target: "checkVote",
                actions: "setOneVote"
              }
            }
          },
          checkVote: {
            always: [
              {
                target: "revealVote",
                cond: "isAllVotesIn"
              },
              { target: "election" }
            ]
          },
          revealVote: {
            after: {
              5000: [
                {
                  target: "filterCards",
                  cond: "isElectionSuccess",
                  actions: ["setNewChancellor", "setPolicyInHand", "resetElectionTracker"]
                },
                {
                  target: "enactRandomPolicy",
                  cond: "isTooManyFailedElections",
                  actions: ["incrementElectionTracker", "enactRandomPolicy"]
                },
                {
                  target: "chancellorSelection",
                  actions: ["setNewPresident", "incrementElectionTracker"]
                }
              ]
            },
            on: {
              removePlayer: {
                target: "revealVote",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "revealVote",
                actions: "setReconnectPlayer"
              }
            }
          },
          enactRandomPolicy: {
            after: {
              5000: [
                {
                  target: "chancellorSelection",
                  actions: ["setNewPresident", "resetElectionTracker", "resetTermLimits"]
                }
              ]
            },
            on: {
              removePlayer: {
                target: "enactRandomPolicy",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "enactRandomPolicy",
                actions: "setReconnectPlayer"
              }
            }
          },
          filterCards: {
            on: {
              removePlayer: {
                target: "filterCards",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "filterCards",
                actions: "setReconnectPlayer"
              },
              cardSelect: {
                target: "enactPolicy",
                actions: "removePolicyFromHand"
              }
            }
          },
          enactPolicy: {
            on: {
              removePlayer: {
                target: "enactPolicy",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "enactPolicy",
                actions: "setReconnectPlayer"
              },
              requestVeto: {
                target: "enactPolicy",
                actions: "requestVeto",
                cond: "isVetoAvailable"
              },
              rejectVeto: {
                target: "enactPolicy",
                actions: "rejectVeto",
                cond: "isVetoRequested"
              },
              approveVeto: {
                target: "enactRandomPolicy",
                cond: "isTooManyFailedElections",
                actions: ["incrementElectionTracker", "enactRandomPolicy", "setNewPolicy"]
              },
              approveVeto: {
                target: "chancellorSelection",
                actions: ["setNewPolicy", "setNewPresident"],
                cond: "isVetoRequested"
              },
              enact: {
                target: "enactingPolicyCard",
                actions: "setNewPolicy"
              }
            }
          },
          enactingPolicyCard: {
            after: {
              8000: [
                {
                  target: "viewThreeCards",
                  cond: "isViewThreeCards"
                },
                {
                  target: "investigatePlayer",
                  cond: "isInvestigate"
                },
                {
                  target: "killPlayer",
                  cond: "isKillPlayer"
                },
                {
                  target: "presidentSelection",
                  cond: "isPickNextPresident"
                },
                {
                  target: "chancellorSelection",
                  actions: "setNewPresident"
                }
              ]
            },
            on: {
              removePlayer: {
                target: "enactRandomPolicy",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "enactRandomPolicy",
                actions: "setReconnectPlayer"
              }
            }
          },
          viewThreeCards: {
            on: {
              removePlayer: {
                target: "viewThreeCards",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "viewThreeCards",
                actions: "setReconnectPlayer"
              },
              doneViewingCards: {
                target: "chancellorSelection",
                actions: "setNewPresident"
              }
            }
          },
          investigatePlayer: {
            on: {
              removePlayer: {
                target: "investigatePlayer",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "investigatePlayer",
                actions: "setReconnectPlayer"
              },
              doneInvestigating: {
                target: "chancellorSelection",
                actions: "setNewPresident"
              }
            }
          },
          killPlayer: {
            on: {
              removePlayer: {
                target: "killPlayer",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "killPlayer",
                actions: "setReconnectPlayer"
              },
              killPlayer: {
                target: "chancellorSelection",
                actions: ["killPlayer", "setNewPresident"],
                cond: "isValidKillingCandidate"
              }
            }
          },
          presidentSelection: {
            on: {
              removePlayer: {
                target: "presidentSelection",
                actions: "setRemovePlayer"
              },
              reconnectPlayer: {
                target: "presidentSelection",
                actions: "setReconnectPlayer"
              },
              selectPresident: {
                target: "chancellorSelection",
                actions: "setNewPresident",
                cond: "isValidGovernmentCandidate"
              }
            }
          }
        }
      },
      liberalWin: { type: "final" },
      fascistWin: { type: "final" }
    }
  },
  {
    actions: {
      setBoardToUse,
      setNewPlayer,
      setRemovePlayer,
      setReconnectPlayer,
      setNewChancellor,
      setNewChancellorCandidate,
      setOneVote,
      setNewPresident,
      setPlayerRoles,
      setNewDrawPile,
      setPolicyInHand,
      setNewPolicy,
      killPlayer,
      removePolicyFromHand,
      requestVeto,
      rejectVeto,
      approveVeto,
      incrementElectionTracker,
      resetElectionTracker,
      resetTermLimits,
      enactRandomPolicy
    },
    guards: {
      isElectionSuccess,
      isEnoughPlayers,
      isAllVotesIn,
      isValidGovernmentCandidate,
      isLiberalWin,
      isFascistWin,
      isViewThreeCards,
      isPickNextPresident,
      isKillPlayer,
      isInvestigate,
      isValidKillingCandidate,
      isVetoAvailable,
      isVetoRequested,
      isTooManyFailedElections
    }
  }
);

export default stateMachine;
