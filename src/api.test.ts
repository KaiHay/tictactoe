import { InMemoryTicTacAPI } from "./api";
//import { initialGameState, type Game } from "./game/game";

describe('InMemoryTictac', () => {
    it('should create new game', async () => {
        const ticTacToe = new InMemoryTicTacAPI();
        const newGame = await ticTacToe.createGame()
        expect(newGame).toBeDefined()
        expect(newGame.id).toBeDefined()
        expect(newGame.currentPlayer).toBe('x')
        //console.log(newGame.currentPlayer);
        expect(newGame.board).toEqual([[null, null, null], [null, null, null], [null, null, null]])



    })
})

describe('InMemoryTictac Move', () => {
    it('should move players', async () => {
        const ticTacToe = new InMemoryTicTacAPI();
        const newGame = await ticTacToe.createGame()
        expect(newGame).toBeDefined()
        expect(newGame.id).toBeDefined()
        expect(newGame.currentPlayer).toBe('x')
        //console.log(newGame.currentPlayer);
        expect(newGame.board).toEqual([[null, null, null], [null, null, null], [null, null, null]])

        let movingGame = await ticTacToe.makeMove(newGame.id, 2, 2)
        expect(movingGame).toBeDefined()
        expect(movingGame.board[2][2]).toBe('x')
        //console.log('Moved: ', movingGame.board[2][2]);
    })

})
//describe()