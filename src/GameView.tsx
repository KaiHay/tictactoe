import { useState, useMemo, useEffect } from 'react'
import { type Game } from './game/game'
import './App.css'
import { io } from 'socket.io-client'
import { ClientTicTacAPI } from './api'
import { Link, useLoaderData, useNavigate } from 'react-router'
import { SERVER_URL } from './utils/constants'

export function GameView() {
  const api = useMemo(() => new ClientTicTacAPI(), [])
  //console.log('hello');

  const { game: initialGame } = useLoaderData<{ game: Game }>()

  const [game, setGame] = useState<Game>(initialGame)
  const [rematch, setRematch] = useState('')

  const navigate = useNavigate()
  const newGameButtonClick = async (prevId: string) => {
    const newGame = (await api.rematchGame(prevId))

    navigate(`/game/${newGame.id}`)
  }

  useEffect(() => {
    setGame(initialGame)
    setRematch('')
  }, [initialGame])

  useEffect(() => {
    const socket = io(SERVER_URL)
    socket.on("connect", () => {
      socket.emit("join-game", game.id)

      socket.on("update-game", async (curr_Game: Game) => {
        const newGame = await api.getGame(curr_Game.id)
        setGame(newGame)
      })
      socket.on("rematch-up", async (gameID: string) => {
        console.log("got a rematch request!", gameID);
        setRematch(gameID)
      })
      // useEffect(() => {
      //   socket.emit("rematch",)
      // }, [rematch])
      return () => { socket.disconnect }
    })
  }, [game.id])

  async function boxClick(row: number, col: number) {
    if (game.board[row][col] != null) {
      return
    }
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

  //styles-------
  const baseButton = 'text-white p-14 rounded h-14 w-14 flex items-center justify-center border'
  const hoverBorder = (row: number, col: number): string => {
    if (game.board[row][col] !== null) {
      return 'hover:bg-red-700 transition transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-lg'
    }
    return 'hover:bg-sky-700 transition transform duration-100 ease-in-out hover:-translate-y-1 hover:-translate-x-1 hover:shadow-lg'
  }
  const middleNoti = 'absolute bg-opacity-0 flex justify-center font-bold text-2xl items-center h-35 w-50 bg-blue-200 rounded border border-zinc-50 text-gray-600'
  const newGameButtonStyle = ' h-10 w-30 rounded-sm  bg-sky-200 cursor-pointer'
  const hoverStyle = ' transition transform duration-100 ease-in-out hover:-translate-y-1 hover:-translate-x-1 hover:shadow-lg'

  return (
    <>
      <div className='flex flex-col items-center justify-center'>

        {(checkWin(game)) ? <div className={middleNoti} role="alert">{checkWin(game) == 'tie' ? ' Tie' : (<>{checkWin(game)?.toLocaleUpperCase()} Wins!</>)}</div> : null}


        <div className='game-board pt-10'>
          {game.board.map((rowObj, rowIdx) => {
            return <div key={rowIdx} className='flex flex-row'>{rowObj.map((_, itmIdx) => {
              return (
                <div key={itmIdx} className=''>
                  <button disabled={game.board[rowIdx][itmIdx] !== null} className={`bg-blue-500  ${baseButton} ${hoverBorder(rowIdx, itmIdx)}`} onClick={() => boxClick(rowIdx, itmIdx)}>
                    {game.board[rowIdx][itmIdx] ? game.board[rowIdx][itmIdx] : ''}
                  </button>
                </div>)

            })}</div>
          })}


        </div>
        <div className='pt-3'>
          <div className='flex justify-center items-center rounded-2xl text-white bg-black w-50 text-center h-10'><h5>Current Player: {game.currentPlayer}</h5></div>
        </div>
        <div className='pt-2'>
          <button className={newGameButtonStyle + hoverStyle} onClick={() => newGameButtonClick(game.id)}>New Game</button>
        </div>
        <div>
          {rematch ? <Link className={newGameButtonStyle + hoverStyle} to={`/game/${rematch}`}>Rematch?</Link> : ''}
        </div>
      </div>
    </>
  )
}

export default GameView
