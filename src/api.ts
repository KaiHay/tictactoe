import { type Board, type Game, type Player, type endStat, move, type PlayerCoords } from './game/game'


export interface TicTacApi {
    createGame(): Promise<Game>
    makeMove(gameId: string, row: number, col: number): Promise<Game>
    getGame(gameId: string): Promise<Game>
}

export class InMemoryTicTacAPI implements TicTacApi {
    private games: Map<string, Game> = new Map()

    async getGame(gameId: string): Promise<Game> {
        const game = this.games.get(gameId)
        if (!game) {
            throw new Error("Game doesn't exist")
        }
        return game
    }

    async makeMove(gameID: string, row: number, col: number): Promise<GameState> {
        const game = await this.getGame(gameID)
        const newCoords: PlayerCoords = { row: row, column: col }
        const newGame = move(game, newCoords)
        this.games.set(gameID, newGame)
        return newGame
    }
}
export class ClientTicTacAPI implements TicTacApi {
    async async getGame(gameId: string): Promise<Game> {

    }
    async makeMove(gameId: string, row: number, col: number): Promise<Game> {

    }
}