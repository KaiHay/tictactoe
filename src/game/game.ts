//move 

export type Cell = 'x' | 'o' | null
export type endState = 'x' | 'o' | undefined | 'tie'
export type Player = 'x' | 'o'
export type Board = Cell[][]
export type PlayerCoords = { row: number, column: number }
export type Game = {
    id: string,
    board: Board,
    currentPlayer: Player,
    end?: endState
}
export const initialGameState = (): Game => {
    const newGame: Game = {
        id: crypto.randomUUID(),
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
        id: currentGame.id,
        board: newBoard,
        currentPlayer: newPlayer,
        end: checkEnd(newBoard, currentGame.currentPlayer)
    }
    return newState
}

export const checkEnd = (board: Board, currentPlayer: Player): endState => {
    //check every cell for current, if true, check up if possible,
    let Full: number = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!board[i][j]) {
                Full++
            }
            else if (board[i][j] == currentPlayer) {
                //diagonals only middle, upleft downright
                if (i == 1 && j == 1) {
                    if (board[i - 1][j - 1] == currentPlayer) {
                        if (board[i + 1][j + 1] == currentPlayer) {
                            console.log('winner');

                            return currentPlayer
                        }
                    }
                    //upright down left
                    if (board[i + 1][j - 1] == currentPlayer) {
                        if (board[i - 1][j + 1] == currentPlayer) {
                            console.log('winner');

                            return currentPlayer
                        }
                    }
                }
                //up down only i=2
                if (i == 1) {
                    if (board[i - 1][j] == currentPlayer) {
                        if (board[i + 1][j] == currentPlayer) {
                            console.log('winner');

                            return currentPlayer
                        }
                    }
                }

                //left right only j=2
                if (j == 1) {
                    if (board[i][j - 1] == currentPlayer) {
                        if (board[i][j + 1] == currentPlayer)
                            return currentPlayer
                    }
                }

            }
        }
    }
    if (Full == 0) {
        //console.log('tie')
        return 'tie'
    }
    return
}

//const exampleGame: Game = {
//    board: [[null, null, null],
//    [null, 'x', null],
//    [null, null, null]
//    ],
//    currentPlayer: 'o'
//}