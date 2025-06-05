import { useEffect, useState } from 'react'
import './App.css'
import { ClientTicTacAPI } from './api'
import { useNavigate } from 'react-router'
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
    return (
        <div>
            <div>
                Current Games:
                <div className='flex flex-col justify-center items-center'>
                    {activeGames.map((key) =>
                        <button className='border' onClick={() => newGameButtonClick()}>{key.id}
                        </button>
                    )}
                    <div className='pt-4'>
                        <button className='border size-20 ' onClick={() => newGameButtonClick()}>New Game</button>
                    </div>
                </div>


            </div>

        </div>
    )
}