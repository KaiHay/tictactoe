import { useState } from 'react'
import {initialGameState, type Game} from './game/game'

const exampleGame:Game = {
    board: [[null,null,null],
    [null,'x',null],
    [null, null, null]
    ],
    currentPlayer: 'o'
}

function App() {
  return (
    <>
      <div>
        <h1>Current Player: {initialGameState().currentPlayer}</h1>
      </div>
    </>
  )
}

export default App
