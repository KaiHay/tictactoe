//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import { DbTicTacApi } from "./src/db/db";
import cors from "cors"
import { Server } from "socket.io"
import { type Game } from "./src/game/game";
const newtictac = new DbTicTacApi()


const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: [
        "GET", "POST"
    ]
}))
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
const makeRoomId = (game: Game) => `game-${game.id}`

app.post("/api/game/:gameId/move", async (req, res) => {
    const game = await newtictac.makeMove(req.params.gameId, req.body.row, req.body.col)
    io.to(makeRoomId(game)).emit('update-game', game);
    res.json(game)
})
app.get("/api/game/:gameId", async (req, res) => {
    const game = await newtictac.getGame(req.params.gameId)
    res.json(game)
})


const PORT = parseInt(process.env.PORT || "3000")
const server = app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: [
            "GET", "POST"
        ]
    }
})

io.on("connection", (socket) => {
    console.log('user connected: ' + socket.id);

    socket.on("join-game", async (gameID: string) => {
        const newGame = await newtictac.getGame(gameID)
        if (!newGame) {
            console.error(`Game ${gameID} not found`)
            return
        }
        const roomId = makeRoomId(newGame)
        socket.join(roomId)
        io.to(roomId).emit('user-joined', socket.id)
    })
})
