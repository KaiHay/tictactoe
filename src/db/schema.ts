import { jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import { type Board } from "../game/game";

export const gamesTable = pgTable("tiktak_games", {
    id: varchar({ length: 255 }).primaryKey(),
    board: jsonb().$type<Board>().notNull(),
    currentPlayer: varchar({ length: 255 }).notNull(),
    end: varchar({ length: 255 }),
});
