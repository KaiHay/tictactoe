import { type Game, move, type PlayerCoords, initialGameState } from './game/game'
import { SERVER_URL } from './utils/constants'

const SERVER_DB_URL = SERVER_URL
export interface TicTacApi {
    createGame(): Promise<Game>
    makeMove(gameId: string, row: number, col: number): Promise<Game>
    getGame(gameId: string): Promise<Game>
    getInProgGames(): Promise<Game[]>
}

export class InMemoryTicTacAPI implements TicTacApi {
    private games: Map<string, Game> = new Map()

    async createGame(): Promise<Game> {
        const game = initialGameState()
        this.games.set(game.id, game)
        //console.log(this.games)
        return game
    }
    async getInProgGames(): Promise<Game[]> {
        return Array.from(this.games.values())
    }
    async getGame(gameId: string): Promise<Game> {
        const game = this.games.get(gameId)
        if (!game) {
            throw new Error("Game doesn't exist")
        }
        return game
    }

    async makeMove(gameID: string, row: number, col: number): Promise<Game> {
        //console.log(gameID);
        //console.log(this.games.size)
        const game = await this.getGame(gameID)

        const newCoords: PlayerCoords = { row: row, column: col }
        const newGame = move(game, newCoords)
        this.games.set(gameID, newGame)
        return newGame
    }
}
export class ClientTicTacAPI implements TicTacApi {
    async createGame(): Promise<Game> {
        const response = await fetch(`${SERVER_DB_URL}/api/game`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const game = await response.json()
        return game
    }
    async rematchGame(gameID: string): Promise<Game> {
        const response = await fetch(`${SERVER_DB_URL}/api/game/${gameID}/rematch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const game = await response.json()
        return game
    }
    async getGame(gameId: string): Promise<Game> {
        const response = await fetch(`${SERVER_DB_URL}/api/game/${gameId}`)
        const game = await response.json()
        return game
    }
    async makeMove(gameId: string, row: number, col: number): Promise<Game> {
        const response = await fetch(`${SERVER_DB_URL}/api/game/${gameId}/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ row, col })
        })
        const game = await response.json()
        return game
    }
    async getInProgGames(): Promise<Game[]> {
        const response = await fetch(`${SERVER_DB_URL}/api/game`)
        const games = await response.json()
        return games
    }
}