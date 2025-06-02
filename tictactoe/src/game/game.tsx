


export type Cell = 'x'|'o'|null
export type endState = 'x'|'o'|undefined|'tie'
export type Player = 'x'|'o'
export type Board = Cell[][]
export type PlayerCoords = {row: Number, column: Number}
export type Game = {
    board: Board,
    currentPlayer: Player,
    end?: endState
}
export const initialGameState = ():Game => {
    const newGame: Game ={
        board: [[null,null,null],[null,null,null],[null,null,null]],
        currentPlayer: 'x'
    }
    return newGame
}
export const move = (game: Game, playerCoords: PlayerCoords):Game =>{
    const newState: Game= initialGameState()
    return newState
}

const exampleGame:Game = {
    board: [[null,null,null],
    [null,'x',null],
    [null, null, null]
    ],
    currentPlayer: 'o'
}