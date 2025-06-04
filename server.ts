//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import { InMemoryTicTacAPI } from "./src/api";
const newtictac = new InMemoryTicTacAPI()

const app = express();
app.use(express.json())
app.get("/message", (_, res) => {
    res.send("Hello from express!")
});
app.post("/api/game", async (req, res) => {
    const game = await newtictac.createGame()
    res.json(game)
})
app.post("/api/game/:gameId/move", async (req, res) => {
    const game = await newtictac.makeMove(req.params.gameId, req.body.row, req.body.col)
    res.json(game)
})
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

