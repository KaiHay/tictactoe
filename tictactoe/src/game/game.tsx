//move 

export type Cell = 'x' | 'o' | null
export type endState = 'x' | 'o' | undefined | 'tie'
export type Player = 'x' | 'o'
export type Board = Cell[][]
export type PlayerCoords = { row: number, column: number }
export type Game = {
    board: Board,
    currentPlayer: Player,
    end?: endState
}
export const initialGameState = (): Game => {
    const newGame: Game = {
        board: [[null, null, null], [null, null, null], [null, null, null]],
        currentPlayer: 'x'
    }
    return newGame
}
export const playerSwitch = (currentPlayer: Player): Player => {
    return (currentPlayer == 'x' ? 'o' : 'x')
}
export const move = (currentGame: Game, playerCoords: PlayerCoords): Game => {
    //takes game and coords, check if coords already selected, copy previous board
    //update board, return new game with next player
    if (currentGame.board[playerCoords.row][playerCoords.column]) return currentGame
    let newBoard = structuredClone(currentGame.board)
    newBoard[playerCoords.row][playerCoords.column] = currentGame.currentPlayer
    const newPlayer = playerSwitch(currentGame.currentPlayer)
    const newState: Game = {
        board: newBoard,
        currentPlayer: newPlayer,
        end: checkEnd(newBoard)
    }
    return newState
}

export const checkEnd = (board: Board): endState => {
    return
}

const exampleGame: Game = {
    board: [[null, null, null],
    [null, 'x', null],
    [null, null, null]
    ],
    currentPlayer: 'o'
}