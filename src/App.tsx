import { useState, useMemo, useEffect } from 'react'
import { initialGameState, move, type Game, type PlayerCoords } from './game/game'
import './App.css'
import { ClientTicTacAPI } from './api'
import clsx from 'clsx'
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
  const api = useMemo(() => new ClientTicTacAPI(), [])
  const [game, setGame] = useState<Game | undefined>()
  useEffect(() => {
    initialGameState()
  }, [])
  async function boxClick(row: number, col: number) {

    const newGame = await api.makeMove(game!.id, row, col)
    setGame(newGame)
  }
  const checkWin = (currentGame: Game) => {
    if (currentGame.end) {
      return currentGame.end
    }
  }

  if (!game) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <>
      <div className='flex flex-col items-center justify-center'>

        {(checkWin(game)) ? <>Result:{checkWin(game) == 'tie' ? ' Tie' : (<>{checkWin(game)} Wins</>)}</> : null}


        <div className='game-board pt-10'>
          <div className='row'>
            <button className='bg-blue-500  text-white py-2 px-4 rounded' onClick={() => boxClick(0, 0)}>{game.board[0][0] ? game.board[0][0] : '-'}</button>
            <button className='bg-red-500 text-white py-2 px-4 rounded' onClick={() => boxClick(0, 1)}>{game.board[0][1] ? game.board[0][1] : '-'}</button>
            <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={() => boxClick(0, 2)}>{game.board[0][2] ? game.board[0][2] : '-'}</button>
          </div>
          <div className='row'>
            <button className='bg-red-500 text-white py-2 px-4 rounded' onClick={() => boxClick(1, 0)}>{game.board[1][0] ? game.board[1][0] : '-'}</button>
            <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={() => boxClick(1, 1)}>{game.board[1][1] ? game.board[1][1] : '-'}</button>
            <button className='bg-red-500 text-white py-2 px-4 rounded' onClick={() => boxClick(1, 2)}>{game.board[1][2] ? game.board[1][2] : '-'}</button>
          </div>
          <div className='row'>
            <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={() => boxClick(2, 0)}>{game.board[2][0] ? game.board[2][0] : '-'}</button>
            <button className='bg-red-500 text-white py-2 px-4 rounded' onClick={() => boxClick(2, 1)}>{game.board[2][1] ? game.board[2][1] : '-'}</button>
            <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={() => boxClick(2, 2)}>{game.board[2][2] ? game.board[2][2] : '-'}</button>
          </div>

        </div>
        <div className='text-cyan-600'><h5>Current Player: {game.currentPlayer}</h5></div>

      </div>
    </>
  )
}

export default App
