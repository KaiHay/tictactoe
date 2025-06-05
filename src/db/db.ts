import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { type Game, type Player, type endState, initialGameState as createNewGame, move } from "../game/game";
import type { TicTacApi } from '../api';
import { gamesTable } from './schema';
import { eq, isNull } from 'drizzle-orm'
const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client);

export class DbTicTacApi implements TicTacApi {
    async createGame(): Promise<Game> {
        const game = createNewGame()
        const values = {
            id: game.id,
            board: game.board,
            currentPlayer: game.currentPlayer,
            end: game.end
        }
        await db.insert(gamesTable).values(values)
        return game
    }
    async makeMove(gameId: string, row: number, col: number): Promise<Game> {
        const game = await this.getGame(gameId)
        const newGame = move(game, { row: row, column: col })
        const values = {
            id: newGame.id,
            board: newGame.board,
            currentPlayer: newGame.currentPlayer,
            end: newGame.end
        }
        await db.update(gamesTable).set(values).where(eq(gamesTable.id, gameId))
        return newGame
    }
    async getGame(gameId: string): Promise<Game> {
        const query = await db.select().from(gamesTable).where(eq(gamesTable.id, gameId))
        if (query.length === 0) {
            throw new Error('Cant find game')
        }
        const game = query[0]
        return {
            id: game.id,
            board: game.board,
            currentPlayer: game.currentPlayer as Player,
            end: game.end as endState
        }
    }
    async getInProgGames(): Promise<Game[]> {
        const query = await db.select().from(gamesTable).where(isNull(gamesTable.end)).limit(5)

        return query.map(game => ({
            id: game.id,
            board: game.board,
            currentPlayer: game.currentPlayer as Player,
        }))
    }
}