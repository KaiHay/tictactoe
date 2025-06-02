import { useState } from 'react'
import { initialGameState, move, type PlayerCoords } from './game/game'

// const exampleGame:Game = {
//     board: [[null,null,null],
//     [null,'x',null],
//     [null, null, null]
//     ],
//     currentPlayer: 'o'
// }

//display 9 boxes and current player, pop up for winner
//boxes -> click -> move, setGame
function App() {
  const [game, setGame] = useState(initialGameState)

  const boxClick = (row: number, col: number) => {
    const clickCoords: PlayerCoords = {
      row: row,
      column: col
    }
    console.log('hi')
    setGame(current => move(current, clickCoords))
  }
  return (
    <>
      <div>
        <h1>Current Player: {game.currentPlayer}</h1>


        <div className='game-board'>
          <div className='row'>
            <button onClick={() => boxClick(0, 0)}>{game.board[0][0] ? game.board[0][0] : '-'}</button>
            <button onClick={() => boxClick(0, 1)}>{game.board[0][1] ? game.board[0][1] : '-'}</button>
            <button onClick={() => boxClick(0, 2)}>{game.board[0][2] ? game.board[0][2] : '-'}</button>
          </div>
          <div className='row'>
            <button onClick={() => boxClick(1, 0)}>{game.board[1][0] ? game.board[1][0] : '-'}</button>
            <button onClick={() => boxClick(1, 1)}>{game.board[1][1] ? game.board[1][1] : '-'}</button>
            <button onClick={() => boxClick(1, 2)}>{game.board[1][2] ? game.board[1][2] : '-'}</button>
          </div>
          <div className='row'>
            <button onClick={() => boxClick(2, 0)}>{game.board[2][0] ? game.board[2][0] : '-'}</button>
            <button onClick={() => boxClick(2, 1)}>{game.board[2][1] ? game.board[2][1] : '-'}</button>
            <button onClick={() => boxClick(2, 2)}>{game.board[2][2] ? game.board[2][2] : '-'}</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
