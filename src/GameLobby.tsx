import { useEffect, useState } from 'react'
import './App.css'
import { ClientTicTacAPI } from './api'
import { Link, useNavigate } from 'react-router'
import { type Game } from './game/game'
const api = new ClientTicTacAPI
export const GameLobby = () => {
    const [activeGames, setActive] = useState<Game[]>([])
    const navigate = useNavigate()
    const newGameButtonClick = async (id?: string) => {
        if (!id) {
            id = ((await api.createGame()).id)
        }
        navigate(`/game/${id}`)
    }
    const renderActive = async () => {
        const newActives = await api.getInProgGames()
        setActive(newActives)
    }
    useEffect(() => {
        renderActive()
    }, [])
    const newGameButtonStyle = ' size-3/4 rounded-sm  bg-sky-200 cursor-pointer'
    const hoverStyle = ' transition transform duration-100 ease-in-out hover:-translate-y-1 hover:-translate-x-1 hover:shadow-lg'
    const lobbyButtonStyle = 'rounded-lg w-22 h-10 bg-sky-200 cursor-pointer'
    return (
        <div className=''>
            <div className='flex flex-col justify-center items-center'>
                <div className='size-1/2 pb-2 pt-3'></div>
                <div className='flex flex-col justify-center items-center w-1/2 bg-cyan-900 pb-5 rounded-2xl max-w-[450px]'>
                    <div className='pt-2 size-3/4 pb-2'>
                        <div className='flex h-3/4 bg-yellow-400 justify-center text-center items-center rounded-lg'>
                            Current Games:
                        </div>
                    </div>
                    {activeGames.map((item) => (
                        <div key={item.id} className='flex items-center justify-center size-3/4 p-1'>
                            <Link className={newGameButtonStyle + hoverStyle} to={`/game/${item.id}`}>
                                {item.id}
                            </Link>
                        </div>

                    )
                    )}
                    <div className='pt-4'>
                        <button className={lobbyButtonStyle + hoverStyle} onClick={() => newGameButtonClick()}>New Game</button>
                    </div>
                </div>



            </div>

        </div >
    )
}