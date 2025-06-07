//e.g server.js
import express from "express";
import { DbTicTacApi } from "./src/db/db";
import cors from "cors"
import { Server } from "socket.io"
import { type Game } from "./src/game/game";
const newtictac = new DbTicTacApi()


const app = express();

app.use(express.json())
app.use(cors())

app.get("/message", (_, res) => {
    res.send("Hello from express!")
});
app.post("/api/game", async (_, res) => {
    const game = await newtictac.createGame()
    res.json(game)
})
app.get("/api/game", async (_, res) => {
    const game = await newtictac.getInProgGames()
    res.json(game)
})
const makeRoomId = (game: Game) => `game-${game.id}`



app.post("/api/game/:gameId/rematch", async (req, _) => {
    const game = await newtictac.createGame()
    io.to(`game-${req.params.gameId}`).emit("rematch-up", game.id);
    //res.json(game)
})



app.post("/api/game/:gameId/move", async (req, _) => {
    const game = await newtictac.makeMove(req.params.gameId, req.body.row, req.body.col)
    io.to(makeRoomId(game)).emit('update-game', game);
    //res.json(game)
})
app.get("/api/game/:gameId", async (req, res) => {
    const game = await newtictac.getGame(req.params.gameId)
    res.json(game)
})


const PORT = parseInt(process.env.PORT || "3000")
const server = app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: [
            "GET", "POST"
        ]
    }
})

io.on("connection", (socket) => {
    socket.on("move", async (gameID: string, row: string, col: string) => {
        // update the game
        const game = await newtictac.makeMove(gameID, parseInt(row), parseInt(col))
        // get the RoomId for the game
        const roomId = `game-${gameID}`
        io.to(roomId).emit("update-game", game)

    })

    socket.on("join-game", async (gameID: string) => {
        const game = await newtictac.getGame(gameID)
        if (!game) {
            console.error(`Game ${gameID} not found`)
            return
        }
        const roomId = makeRoomId(game)
        // most likely i will need to leave rooms here.
        socket.rooms.forEach((room) => socket.leave(room))
        socket.join(roomId)
    })

    //rematch 
    socket.on("rematch", async (gameID: string, prevID: string) => {
        const newGame = await newtictac.getGame(gameID)
        io.to(`game-${prevID}`).emit("rematch-up", newGame.id)

    })
})
