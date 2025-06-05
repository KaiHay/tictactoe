import { useState, useMemo, useEffect } from 'react'
import { type Game } from './game/game'
import './App.css'

import { ClientTicTacAPI } from './api'
import { useLoaderData } from 'react-router'

export function GameView() {
  const api = useMemo(() => new ClientTicTacAPI(), [])
  //console.log('hello');

  const { game: initialGame } = useLoaderData<{ game: Game }>()

  const [game, setGame] = useState<Game>(initialGame)

  // async function createGameState() {
  //   const initialState = await api.createGame()
  //   setGame(initialState)
  // }

  // useEffect(() => {
  //   createGameState()
  // }, [])
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
  const baseButton = 'text-white p-14 rounded h-14 w-14 flex items-center justify-center border'
  const middleNoti = 'absolute bg-opacity-0 flex justify-center font-bold text-2xl items-center h-35 w-50 bg-blue-200 rounded border border-zinc-50 text-gray-600'
  return (
    <>
      <div className='flex flex-col items-center justify-center'>

        {(checkWin(game)) ? <div className={middleNoti} role="alert">{checkWin(game) == 'tie' ? ' Tie' : (<>{checkWin(game)?.toLocaleUpperCase()} Wins!</>)}</div> : null}


        <div className='game-board pt-10'>
          {game.board.map((rowObj, rowIdx) => {
            return <div key={rowIdx} className='flex flex-row'>{rowObj.map((item, itmIdx) => {
              return (
                <div key={itmIdx} className=''>
                  <button className={`bg-blue-500  ${baseButton}`} onClick={() => boxClick(rowIdx, itmIdx)}>
                    {game.board[rowIdx][itmIdx] ? game.board[rowIdx][itmIdx] : ''}
                  </button>
                </div>)

            })}</div>
          })}


        </div>
        <div className='pt-3'>
          <div className='flex justify-center items-center rounded-2xl text-white bg-black w-50 text-center h-10'><h5>Current Player: {game.currentPlayer}</h5></div>
        </div>

      </div>
    </>
  )
}

export default GameView
