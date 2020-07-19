import {
  Machine,
  State,
  actions,
  assign,
  send,
  sendParent,
  interpret,
  spawn
} from "xstate";

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
    "drawPile": [
      "L",
      "F",
      "L",
      "F",
      "L",
      "F",
      "L",
      "F",
      "L",
      "F",
      "L",
      "F",
      "F",
      "F"
    ],
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
  chancellorIndex: (_, event) => event.index,
  players: (context) => context.players.map((p) => ({ ...p, vote: null }))
});

const setNewPresident = assign((context, action) => {
  let presidentIndex =
    context.presidentIndex === null
      ? 0
      : (context.presidentIndex + 1) % context.players.length;

  while (!context.players[presidentIndex].isActive) {
    presidentIndex = (presidentIndex + 1) % context.players.length;
  }

  if (action.type !== "killPlayer" && action.index) {
    presidentIndex = action.index;
  }

  return {
    prevChancellorIndex: context.chancellorIndex,
    prevPresidentIndex: context.presidentIndex,
    chancellorIndex: null,
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
  if (context.drawPile && context.drawPile.length >= 3) {
    newDrawPile = [...context.drawPile];
  } else {
    newDrawPile = [...allPolicyCards];
    shuffle(newDrawPile);
  }

  const newPoliciesInHand = [
    newDrawPile.pop(),
    newDrawPile.pop(),
    newDrawPile.pop()
  ];

  return {
    drawPile: newDrawPile,
    policiesInHand: newPoliciesInHand,
    vetoRequested: null,
    vetoApproved: null
  };
});

const setNewPolicy = assign((context, action) => {
  if (context.policiesInHand[action.index] === "F") {
    return {
      enactedFascistPolicies: context.enactedFascistPolicies + 1
    };
  }
  return {
    enactedLiberalPolicies: context.enactedLiberalPolicies + 1
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
  players: context.players.filter((p) => p.id !== action.id)
}));

const removePolicyFromHand = assign((context, action) => ({
  policiesInHand: context.policiesInHand.filter((item, index) => {
    return index !== action.index;
  })
}));

const killPlayer = assign((context, event) => ({
  players: context.players.map((p, i) =>
    i !== event.index ? p : { ...p, isActive: false }
  )
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
      topPolicyCard === "F"
        ? context.enactedFascistPolicies + 1
        : context.enactedFascistPolicies,
    enactedLiberalPolicies:
      topPolicyCard === "L"
        ? context.enactedLiberalPolicies + 1
        : context.enactedLiberalPolicies
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
    context.players.filter((p) => typeof p.vote !== "boolean" && p.isActive)
      .length === 0;
  return result;
}

function isEnoughPlayers(context) {
  const count = context.players.length;
  return count >= 5 && count <= 10;
}

function isLiberalWin(context, action) {
  return (
    context.policiesInHand[action.index] === "L" &&
    context.enactedLiberalPolicies === 5
  );
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
  if (context.policiesInHand[event.index] === "L") {
    return false;
  }
  return (
    context.board[context.enactedFascistPolicies] === ability.TOP_THREE_CARD
  );
}
function isPickNextPresident(context, event) {
  if (context.policiesInHand[event.index] === "L") {
    return false;
  }
  return (
    context.board[context.enactedFascistPolicies] ===
    ability.PICK_NEXT_PRESIDENT
  );
}

function isKillPlayer(context, event) {
  if (context.policiesInHand[event.index] === "L") {
    return false;
  }
  return context.board[context.enactedFascistPolicies] === ability.KILL_PLAYER;
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
              start: {
                target: "chancellorSelection",
                cond: "isEnoughPlayers",
                actions: [
                  "setPlayerRoles",
                  "setNewPresident",
                  "setNewDrawPile",
                  "setBoardToUse"
                ]
              }
            }
          },
          chancellorSelection: {
            on: {
              selectChancellor: {
                target: "election",
                actions: "setNewChancellor",
                cond: "isValidGovernmentCandidate"
              }
            }
          },
          election: {
            on: {
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
                  actions: ["setPolicyInHand", "resetElectionTracker"]
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
            }
          },
          enactRandomPolicy: {
            after: {
              5000: [
                {
                  target: "chancellorSelection",
                  actions: [
                    "setNewPresident",
                    "resetElectionTracker",
                    "resetTermLimits"
                  ]
                }
              ]
            }
          },
          filterCards: {
            on: {
              cardSelect: {
                target: "enactPolicy",
                actions: "removePolicyFromHand"
              }
            }
          },
          enactPolicy: {
            on: {
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
                actions: [
                  "incrementElectionTracker",
                  "enactRandomPolicy",
                  "setNewPolicy"
                ]
              },
              approveVeto: {
                target: "chancellorSelection",
                actions: ["setNewPolicy", "setNewPresident"],
                cond: "isVetoRequested"
              },
              enact: [
                {
                  target: "viewThreeCards",
                  cond: "isViewThreeCards",
                  actions: "setNewPolicy"
                },
                {
                  target: "investigatePlayer",
                  cond: "isInvestigate",
                  actions: "setNewPolicy"
                },
                {
                  target: "killPlayer",
                  cond: "isKillPlayer",
                  actions: "setNewPolicy"
                },
                {
                  target: "presidentSelection",
                  cond: "isPickNextPresident",
                  actions: "setNewPolicy"
                },
                {
                  target: "chancellorSelection",
                  actions: ["setNewPolicy", "setNewPresident"]
                }
              ]
            }
          },
          viewThreeCards: {
            on: {
              doneViewingCards: {
                target: "chancellorSelection",
                actions: "setNewPresident"
              }
            }
          },
          investigatePlayer: {
            on: {
              doneInvestigating: {
                target: "chancellorSelection",
                actions: "setNewPresident"
              }
            }
          },
          killPlayer: {
            on: {
              killPlayer: {
                target: "chancellorSelection",
                actions: ["killPlayer", "setNewPresident"],
                cond: "isValidKillingCandidate"
              }
            }
          },
          presidentSelection: {
            on: {
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
      setNewChancellor,
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
