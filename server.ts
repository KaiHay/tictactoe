//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import { DbTicTacApi } from "./src/db/db";
const newtictac = new DbTicTacApi()

const app = express();
app.use(express.json())
app.get("/message", (_, res) => {
    res.send("Hello from express!")
});
app.post("/api/game", async (req, res) => {
    const game = await newtictac.createGame()
    res.json(game)
})
app.get("/api/game", async (req, res) => {
    const game = await newtictac.getInProgGames()


    res.json(game)
})
app.post("/api/game/:gameId/move", async (req, res) => {
    const game = await newtictac.makeMove(req.params.gameId, req.body.row, req.body.col)
    res.json(game)
})
app.get("/api/game/:gameId", async (req, res) => {
    const game = await newtictac.getGame(req.params.gameId)
    res.json(game)
})
ViteExpress.listen(app, 3000, () => console.log("Server is listening on 3000"));

