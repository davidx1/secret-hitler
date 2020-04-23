import stateMachine from "./MyRoomXState"
const mockMath = Object.create(global.Math)
mockMath.random = () => 0.3
global.Math = mockMath

let nextState = null

const ability = {
  NONE: "NONE",
  TOP_THREE_CARD: "TOP_THREE_CARD",
  KILL_PLAYER: "KILL_PLAYER",
  INVESTIGATE: "INVESTIGATE",
  PICK_NEXT_PRESIDENT: "PICK_NEXT_PRESIDENT"
}

test("being able to add 1 new player", () => {
  const { initialState } = stateMachine
  nextState = stateMachine.transition(initialState, {
    "type": "newPlayer",
    "id": 1,
    "displayName": "bob"
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})

test("being able to add multiple new players", () => {
  nextState = stateMachine.transition(nextState, {
    "type": "newPlayer",
    "id": 2,
    "displayName": "john"
  })

  nextState = stateMachine.transition(nextState, {
    "type": "newPlayer",
    "id": 3,
    "displayName": "amanda"
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})

test("That the game will not start when not enough players", () => {
  nextState = stateMachine.transition(nextState, {
    "type": "start"
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})

test("That the game will start when enough players", () => {
  nextState = stateMachine.transition(nextState, {
    "type": "newPlayer",
    "id": 4,
    "displayName": "lisa"
  })

  nextState = stateMachine.transition(nextState, {
    "type": "newPlayer",
    "id": 5,
    "displayName": "vivian"
  })

  nextState = stateMachine.transition(nextState, {
    "type": "newPlayer",
    "id": 6,
    "displayName": "tina"
  })

  nextState = stateMachine.transition(nextState, {
    "type": "start"
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})

test("Being able to select a chancellor", () => {
  const temp = stateMachine.transition(nextState, {
    "type": "selectChancellor",
    "index": 3
  })

  expect({
    value: temp.value,
    context: temp.context
  }).toMatchSnapshot()

  nextState = stateMachine.transition(nextState, {
    "type": "selectChancellor",
    "index": 2
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})

test("Player is able to vote", () => {
  const temp = stateMachine.transition(nextState, {
    "type": "vote",
    "id": 1
  })

  expect({
    value: temp.value,
    context: temp.context
  }).toMatchSnapshot()

  const temp2 = stateMachine.transition(nextState, {
    "type": "vote",
    "id": true
  })

  expect({
    value: temp2.value,
    context: temp2.context
  }).toMatchSnapshot()

  nextState = stateMachine.transition(nextState, {
    "type": "vote",
    "id": 1,
    "value": true
  })

  nextState = stateMachine.transition(nextState, {
    "type": "vote",
    "id": 2,
    "value": true
  })

  nextState = stateMachine.transition(nextState, {
    "type": "vote",
    "id": 3,
    "value": true
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})

test("Cannot reveal vote until everyone has voted", () => {
  nextState = stateMachine.transition(nextState, {
    "type": "revealVote"
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})

test("select new chancellor if vote fails", () => {
  let temp = stateMachine.transition(nextState, {
    "type": "vote",
    "id": 3,
    "value": false
  })

  temp = stateMachine.transition(temp, {
    "type": "vote",
    "id": 4,
    "value": false
  })

  temp = stateMachine.transition(temp, {
    "type": "vote",
    "id": 5,
    "value": false
  })

  temp = stateMachine.transition(temp, {
    "type": "vote",
    "id": 6,
    "value": false
  })

  temp = stateMachine.transition(temp, {
    "type": "revealVote"
  })

  expect({
    value: temp.value,
    context: temp.context
  }).toMatchSnapshot()
})

test("select new chancellor if vote fails", () => {
  let temp = stateMachine.transition(nextState, {
    "type": "vote",
    "id": 3,
    "value": false
  })

  temp = stateMachine.transition(temp, {
    "type": "vote",
    "id": 4,
    "value": false
  })

  temp = stateMachine.transition(temp, {
    "type": "vote",
    "id": 5,
    "value": false
  })

  temp = stateMachine.transition(temp, {
    "type": "vote",
    "id": 6,
    "value": false
  })

  temp = stateMachine.transition(temp, {
    "type": "revealVote"
  })

  expect({
    value: temp.value,
    context: temp.context
  }).toMatchSnapshot()
})

test("go to filterCards", () => {
  nextState = stateMachine.transition(nextState, {
    "type": "vote",
    "id": 4,
    "value": true
  })

  nextState = stateMachine.transition(nextState, {
    "type": "vote",
    "id": 5,
    "value": true
  })

  nextState = stateMachine.transition(nextState, {
    "type": "vote",
    "id": 6,
    "value": true
  })
  nextState = stateMachine.transition(nextState, {
    "type": "revealVote"
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})

test("being able to select a card.", () => {
  nextState = stateMachine.transition(nextState, {
    "type": "cardSelect",
    "index": 1
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})

test("can enact a policy from the policy in hand for", () => {
  const temp = stateMachine.transition(nextState, {
    "type": "enact",
    "index": 1
  })

  expect({
    value: temp.value,
    context: temp.context
  }).toMatchSnapshot()

  nextState = stateMachine.transition(nextState, {
    "type": "enact",
    "index": 2
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})

test("cannot select a chancellor that was in play last turn", () => {
  const temp = stateMachine.transition(nextState, {
    "type": "selectChancellor",
    "index": 0
  })

  expect({
    value: temp.value,
    context: temp.context
  }).toMatchSnapshot()
})

test("cannot select a chancellor that is the current president", () => {
  const temp = stateMachine.transition(nextState, {
    "type": "selectChancellor",
    "index": 1
  })

  expect({
    value: temp.value,
    context: temp.context
  }).toMatchSnapshot()
})

function allVoteYes() {
  for (var i = 1; i <= 6; i++) {
    nextState = stateMachine.transition(nextState, {
      "type": "vote",
      "id": i,
      "value": true
    })
  }

  nextState = stateMachine.transition(nextState, {
    "type": "revealVote"
  })
}

test("running the game for two rounds", () => {
  nextState = stateMachine.transition(nextState, {
    "type": "selectChancellor",
    "index": 3
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()

  allVoteYes()

  nextState = stateMachine.transition(nextState, {
    "type": "cardSelect",
    "index": 1
  })

  nextState = stateMachine.transition(nextState, {
    "type": "enact",
    "index": 0
  })

  nextState = stateMachine.transition(nextState, {
    "type": "selectChancellor",
    "index": 4
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()

  allVoteYes()

  nextState = stateMachine.transition(nextState, {
    "type": "cardSelect",
    "index": 2
  })

  nextState = stateMachine.transition(nextState, {
    "type": "enact",
    "index": 0
  })

  nextState = stateMachine.transition(nextState, {
    "type": "selectChancellor",
    "index": 5
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()

  allVoteYes()
})

test("Can go into view three cards successfully", () => {
  nextState = stateMachine.transition(nextState, {
    "type": "cardSelect",
    "index": 2
  })

  nextState = stateMachine.transition(nextState, {
    "type": "enact",
    "index": 0
  })

  expect({
    value: nextState.value,
    context: nextState.context
  }).toMatchSnapshot()
})
