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
  PICK_NEXT_PRESIDENT: "PICK_NEXT_PRESIDENT"
};

const boardFor = {
  6: [
    ability.NONE,
    ability.NONE,
    ability.TOP_THREE_CARD,
    ability.KILL_PLAYER,
    ability.KILL_PLAYER
  ],
  8: [
    ability.NONE,
    ability.INVESTIGATE,
    ability.PICK_NEXT_PRESIDENT,
    ability.KILL_PLAYER,
    ability.KILL_PLAYER
  ],
  10: [
    ability.INVESTIGATE,
    ability.INVESTIGATE,
    ability.PICK_NEXT_PRESIDENT,
    ability.KILL_PLAYER,
    ability.KILL_PLAYER
  ]
};

export const prodInitialState = {
  value: "waiting",
  context: {
    players: [],
    board: [],
    drawPile: [],
    policiesInHand: [],
    prevPresidentIndex: null,
    prevChancellorIndex: null,
    presidentIndex: null,
    chancellorIndex: null,
    enactedLiberalPolicies: 0,
    enactedFascistPolicies: 0
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
    "presidentIndex": 0,
    "prevChancellorIndex": null,
    "prevPresidentIndex": null
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

const setNewPresident = assign((context, event) => {
  return {
    prevChancellorIndex: context.chancellorIndex,
    prevPresidentIndex: context.presidentIndex,
    chancellorIndex: null,
    policiesInHand: [],
    presidentIndex:
      context.presidentIndex === null
        ? 0
        : (context.presidentIndex + 1) % context.players.length
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
    policiesInHand: newPoliciesInHand
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
      isActive: true
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

function isElectionSuccess(context) {
  const result =
    isAllVotesIn(context) &&
    context.players.reduce((acc, cur) => (cur.vote ? acc + 1 : acc - 1), 0) > 0;
  return result;
}

function isHitlerElected(context) {
  const elected = isElectionSuccess(context);
  return (
    elected &&
    context.enactedFascistPolicies > 3 &&
    typeof context.chancellorIndex === "number" &&
    context.players[context.chancellorIndex].role === "H"
  );
}

function isValidGovernmentCandidate(context, event) {
  return (
    context.players[event.index].isActive &&
    event.index !== context.prevChancellorIndex &&
    event.index !== context.prevPresidentIndex &&
    event.index !== context.presidentIndex
  );
}

function isValidKillingCandidate(context, event) {
  return context.players[event.index].isActive;
}

function isAllVotesIn(context) {
  return (
    context.players.filter((p) => typeof p.vote !== "boolean").length === 0
  );
}

function isEnoughPlayers(context) {
  const count = context.players.length;
  return count >= 5 && count <= 10;
}

function isLiberalWin(context) {
  return context.enactedLiberalPolicies === 5;
}

function isFascistWin(context) {
  return context.enactedFascistPolicies === 6;
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

const stateMachine = Machine(
  {
    id: "secret-hitler",
    initial: initial.value,
    context: initial.context,
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
          revealVote: [
            { target: "fascistWin", cond: "isHitlerElected" },
            {
              target: "filterCards",
              cond: "isElectionSuccess",
              actions: "setPolicyInHand"
            },
            {
              target: "chancellorSelection",
              actions: "setNewPresident",
              cond: "isAllVotesIn"
            }
          ],
          vote: {
            target: "election",
            actions: "setOneVote"
          }
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
          enact: [
            {
              target: "liberalWin",
              actions: "setNewPolicy",
              cond: "isLiberalWin"
            },
            {
              target: "fascistWin",
              actions: "setNewPolicy",
              cond: "isFascistWin"
            },
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
      removePolicyFromHand
    },
    guards: {
      isElectionSuccess,
      isEnoughPlayers,
      isAllVotesIn,
      isHitlerElected,
      isValidGovernmentCandidate,
      isLiberalWin,
      isFascistWin,
      isViewThreeCards,
      isPickNextPresident,
      isKillPlayer,
      isInvestigate,
      isValidKillingCandidate
    }
  }
);

export default stateMachine;
