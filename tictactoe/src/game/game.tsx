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
        end: checkEnd(newBoard, currentGame.currentPlayer)
    }
    return newState
}

export const checkEnd = (board: Board, currentPlayer: Player): endState => {
    //check every cell for current, if true, check up if possible,
    for (let i = 0; i++; i < 3) {
        for (let j = 0; j++; j < 3) {
            if (board[i][j] == currentPlayer) {
                //diagonals only middle, upleft downright
                if (i == 2 || j == 2) {
                    if (board[i - 1][j - 1] == currentPlayer) {
                        if (board[i + 1][j + 1] == currentPlayer) {
                            return currentPlayer
                        }
                    }
                    //upright down left
                    if (board[i + 1][j - 1] == currentPlayer) {
                        if (board[i - 1][j + 1] == currentPlayer)
                            return currentPlayer
                    }
                }
                //up down only i=2
                if (i == 2) {
                    if (board[i - 1][j] == currentPlayer) {
                        if (board[i + 1][j] == currentPlayer)
                            return currentPlayer
                    }
                }

                //left right only j=2
                if (j == 2) {
                    if (board[i][j - 1] == currentPlayer) {
                        if (board[i][j + 1] == currentPlayer)
                            return currentPlayer
                    }
                }

            }
        }
    }
    return
}

const exampleGame: Game = {
    board: [[null, null, null],
    [null, 'x', null],
    [null, null, null]
    ],
    currentPlayer: 'o'
}