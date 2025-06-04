import { useState, useMemo, useEffect } from 'react'
import { type Game } from './game/game'
import './App.css'

import { ClientTicTacAPI } from './api'

function App() {
  const api = useMemo(() => new ClientTicTacAPI(), [])
  const [game, setGame] = useState<Game | undefined>()
  async function createGameState() {
    const initialState = await api.createGame()
    setGame(initialState)
  }

  useEffect(() => {
    createGameState()
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
  const baseButton = 'text-white p-14 rounded h-14 w-14'
  return (
    <>
      <div className='flex flex-col items-center justify-center'>

        {(checkWin(game)) ? <>Result:{checkWin(game) == 'tie' ? ' Tie' : (<>{checkWin(game)} Wins</>)}</> : null}


        <div className='game-board pt-10'>
          {/* {game.board.map((rowObj,rowIdx)=>{
            rowObj.map((item,itmIdx)=>{
              return(<></>)
            })
          })} */}
          <div className='flex flex-row'>
            <button className={`bg-blue-500  ${baseButton}`} onClick={() => boxClick(0, 0)}>{game.board[0][0] ? game.board[0][0] : ''}</button>
            <button className={`bg-red-500 ${baseButton}`} onClick={() => boxClick(0, 1)}>{game.board[0][1] ? game.board[0][1] : ''}</button>
            <button className={`bg-blue-500 ${baseButton}`} onClick={() => boxClick(0, 2)}>{game.board[0][2] ? game.board[0][2] : ''}</button>
          </div>
          <div className='flex flex-row'>
            <button className={`bg-red-500 ${baseButton}`} onClick={() => boxClick(1, 0)}>{game.board[1][0] ? game.board[1][0] : ''}</button>
            <button className={`bg-blue-500 ${baseButton}`} onClick={() => boxClick(1, 1)}>{game.board[1][1] ? game.board[1][1] : ''}</button>
            <button className={`bg-red-500 ${baseButton}`} onClick={() => boxClick(1, 2)}>{game.board[1][2] ? game.board[1][2] : ''}</button>
          </div>
          <div className='flex flex-row'>
            <button className={`bg-blue-500 ${baseButton}`} onClick={() => boxClick(2, 0)}>{game.board[2][0] ? game.board[2][0] : ''}</button>
            <button className={`bg-red-500 ${baseButton}`} onClick={() => boxClick(2, 1)}>{game.board[2][1] ? game.board[2][1] : ''}</button>
            <button className={`bg-blue-500 ${baseButton}`} onClick={() => boxClick(2, 2)}>{game.board[2][2] ? game.board[2][2] : ''}</button>
          </div>

        </div>
        <div className='text-cyan-600'><h5>Current Player: {game.currentPlayer}</h5></div>

      </div>
    </>
  )
}

export default App
