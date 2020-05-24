export const chancellorSelection = {
  "state": "chancellorSelection",
  "context": {
    "players": [
      {
        "id": "zytBL148W",
        "displayName": "Laura",
        "vote": null,
        "role": "L",
        "isActive": true
      },
      {
        "id": "T2nLfSQvi",
        "displayName": "Tony",
        "vote": null,
        "role": "L",
        "isActive": true
      },
      {
        "id": "Bf01Rv505",
        "displayName": "Raymond",
        "vote": null,
        "role": "F",
        "isActive": true
      },
      {
        "id": "brfGFh8h0",
        "displayName": "Terry",
        "vote": null,
        "role": "H",
        "isActive": true
      },
      {
        "id": "1WRSZanld",
        "displayName": "Mason",
        "vote": null,
        "role": "L",
        "isActive": true
      },
      {
        "id": "TmSswLUch",
        "displayName": "Jeffery",
        "vote": null,
        "role": "L",
        "isActive": true
      }
    ],
    "board": ["NONE", "NONE", "TOP_THREE_CARD", "KILL_PLAYER", "KILL_PLAYER"],
    "drawPile": [
      "F",
      "L",
      "F",
      "L",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "L",
      "L",
      "L",
      "F",
      "L",
      "F",
      "F"
    ],
    "policiesInHand": ["F", "L", "F"],
    "prevPresidentIndex": null,
    "prevChancellorIndex": null,
    "presidentIndex": 0,
    "chancellorIndex": null,
    "enactedLiberalPolicies": 0,
    "enactedFascistPolicies": 0
  }
};

export const election = {
  "state": "election",
  "context": {
    "players": [
      {
        "id": "zytBL148W",
        "displayName": "Terry",
        "vote": null,
        "role": "L",
        "isActive": true
      },
      {
        "id": "8JQgNO6t4",
        "displayName": "Julia",
        "vote": null,
        "role": "L",
        "isActive": true
      },
      {
        "id": "lnj51cDFo",
        "displayName": "Betty",
        "vote": null,
        "role": "F",
        "isActive": true
      },
      {
        "id": "36mlGqu0a",
        "displayName": "Eddie",
        "vote": null,
        "role": "L",
        "isActive": true
      },
      {
        "id": "qmtd7nTJx",
        "displayName": "Seth",
        "vote": null,
        "role": "H",
        "isActive": true
      }
    ],
    "board": ["NONE", "NONE", "TOP_THREE_CARD", "KILL_PLAYER", "KILL_PLAYER"],
    "drawPile": [
      "F",
      "F",
      "F",
      "L",
      "F",
      "F",
      "F",
      "L",
      "F",
      "L",
      "L",
      "F",
      "F",
      "F",
      "L",
      "F",
      "L"
    ],
    "policiesInHand": [],
    "prevPresidentIndex": null,
    "prevChancellorIndex": null,
    "presidentIndex": 0,
    "chancellorIndex": 1,
    "enactedLiberalPolicies": 0,
    "enactedFascistPolicies": 0
  }
};

export const voted = {
  "state": "election",
  "context": {
    "players": [
      {
        "id": "zytBL148W",
        "displayName": "Terry",
        "vote": false,
        "role": "L",
        "isActive": true
      },
      {
        "id": "8JQgNO6t4",
        "displayName": "Julia",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "lnj51cDFo",
        "displayName": "Betty",
        "vote": false,
        "role": "F",
        "isActive": true
      },
      {
        "id": "36mlGqu0a",
        "displayName": "Eddie",
        "vote": null,
        "role": "L",
        "isActive": true
      },
      {
        "id": "qmtd7nTJx",
        "displayName": "Seth",
        "vote": null,
        "role": "H",
        "isActive": true
      }
    ],
    "board": ["NONE", "NONE", "TOP_THREE_CARD", "KILL_PLAYER", "KILL_PLAYER"],
    "drawPile": [
      "F",
      "F",
      "F",
      "L",
      "F",
      "F",
      "F",
      "L",
      "F",
      "L",
      "L",
      "F",
      "F",
      "F",
      "L",
      "F",
      "L"
    ],
    "policiesInHand": [],
    "prevPresidentIndex": null,
    "prevChancellorIndex": null,
    "presidentIndex": 0,
    "chancellorIndex": 1,
    "enactedLiberalPolicies": 0,
    "enactedFascistPolicies": 0
  }
};

export const revealVote = {
  "state": "election",
  "context": {
    "players": [
      {
        "id": "zytBL148W",
        "displayName": "Terry",
        "vote": false,
        "role": "L",
        "isActive": true
      },
      {
        "id": "8JQgNO6t4",
        "displayName": "Julia",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "lnj51cDFo",
        "displayName": "Betty",
        "vote": false,
        "role": "F",
        "isActive": true
      },
      {
        "id": "36mlGqu0a",
        "displayName": "Eddie",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "qmtd7nTJx",
        "displayName": "Seth",
        "vote": true,
        "role": "H",
        "isActive": true
      }
    ],
    "board": ["NONE", "NONE", "TOP_THREE_CARD", "KILL_PLAYER", "KILL_PLAYER"],
    "drawPile": [
      "F",
      "F",
      "F",
      "L",
      "F",
      "F",
      "F",
      "L",
      "F",
      "L",
      "L",
      "F",
      "F",
      "F",
      "L",
      "F",
      "L"
    ],
    "policiesInHand": [],
    "prevPresidentIndex": null,
    "prevChancellorIndex": null,
    "presidentIndex": 0,
    "chancellorIndex": 1,
    "enactedLiberalPolicies": 0,
    "enactedFascistPolicies": 0
  }
};

export const filterCards = {
  "state": "filterCards",
  "context": {
    "players": [
      {
        "id": "zytBL148W",
        "displayName": "Terry",
        "vote": false,
        "role": "L",
        "isActive": true
      },
      {
        "id": "8JQgNO6t4",
        "displayName": "Julia",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "lnj51cDFo",
        "displayName": "Betty",
        "vote": false,
        "role": "F",
        "isActive": true
      },
      {
        "id": "36mlGqu0a",
        "displayName": "Eddie",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "qmtd7nTJx",
        "displayName": "Seth",
        "vote": true,
        "role": "H",
        "isActive": true
      }
    ],
    "board": ["NONE", "NONE", "TOP_THREE_CARD", "KILL_PLAYER", "KILL_PLAYER"],
    "drawPile": [
      "F",
      "F",
      "F",
      "L",
      "F",
      "F",
      "F",
      "L",
      "F",
      "L",
      "L",
      "F",
      "F",
      "F"
    ],
    "policiesInHand": ["L", "F", "L"],
    "prevPresidentIndex": null,
    "prevChancellorIndex": null,
    "presidentIndex": 0,
    "chancellorIndex": 1,
    "enactedLiberalPolicies": 0,
    "enactedFascistPolicies": 0
  }
};

export const viewThreeCards = {
  "state": "viewThreeCards",
  "context": {
    "players": [
      {
        "id": "zytBL148W",
        "displayName": "Jackson",
        "vote": true,
        "role": "H",
        "isActive": true
      },
      {
        "id": "Pi6zCcwUZ",
        "displayName": "Verna",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "2tarmYOKq",
        "displayName": "Edna",
        "vote": true,
        "role": "F",
        "isActive": true
      },
      {
        "id": "aHD60VjLD",
        "displayName": "Jared",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "JbjaH1Iyc",
        "displayName": "Sally",
        "vote": true,
        "role": "L",
        "isActive": true
      }
    ],
    "board": ["NONE", "NONE", "TOP_THREE_CARD", "KILL_PLAYER", "KILL_PLAYER"],
    "drawPile": ["F", "F", "F", "L", "L", "L", "F", "F"],
    "policiesInHand": ["F", "F"],
    "prevPresidentIndex": 3,
    "prevChancellorIndex": 1,
    "presidentIndex": 0,
    "chancellorIndex": 2,
    "enactedLiberalPolicies": 0,
    "enactedFascistPolicies": 3
  }
};

export const investigatePlayer = {
  "state": "investigatePlayer",
  "context": {
    "players": [
      {
        "id": "zytBL148W",
        "displayName": "Jackson",
        "vote": true,
        "role": "H",
        "isActive": true
      },
      {
        "id": "Pi6zCcwUZ",
        "displayName": "Verna",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "2tarmYOKq",
        "displayName": "Edna",
        "vote": true,
        "role": "F",
        "isActive": true
      },
      {
        "id": "aHD60VjLD",
        "displayName": "Jared",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "JbjaH1Iyc",
        "displayName": "Sally",
        "vote": true,
        "role": "L",
        "isActive": true
      }
    ],
    "board": ["NONE", "NONE", "TOP_THREE_CARD", "KILL_PLAYER", "KILL_PLAYER"],
    "drawPile": ["F", "F", "F", "L", "L", "L", "F", "F"],
    "policiesInHand": ["F", "F"],
    "prevPresidentIndex": 3,
    "prevChancellorIndex": 1,
    "presidentIndex": 0,
    "chancellorIndex": 2,
    "enactedLiberalPolicies": 0,
    "enactedFascistPolicies": 3
  }
};

export const killPlayer = {
  "state": "killPlayer",
  "context": {
    "players": [
      {
        "id": "zytBL148W",
        "displayName": "Jackson",
        "vote": true,
        "role": "H",
        "isActive": true
      },
      {
        "id": "Pi6zCcwUZ",
        "displayName": "Verna",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "2tarmYOKq",
        "displayName": "Edna",
        "vote": true,
        "role": "F",
        "isActive": true
      },
      {
        "id": "aHD60VjLD",
        "displayName": "Jared",
        "vote": true,
        "role": "L",
        "isActive": true
      },
      {
        "id": "JbjaH1Iyc",
        "displayName": "Sally",
        "vote": true,
        "role": "L",
        "isActive": true
      }
    ],
    "board": ["NONE", "NONE", "TOP_THREE_CARD", "KILL_PLAYER", "KILL_PLAYER"],
    "drawPile": ["F", "F", "F", "L", "L", "L", "F", "F"],
    "policiesInHand": ["F", "F"],
    "prevPresidentIndex": 3,
    "prevChancellorIndex": 1,
    "presidentIndex": 0,
    "chancellorIndex": 2,
    "enactedLiberalPolicies": 0,
    "enactedFascistPolicies": 3
  }
};
