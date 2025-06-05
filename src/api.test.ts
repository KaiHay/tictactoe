import { DbTicTacApi } from "./db/db";
describe('dbTicTak Test', () => {
    const ticTacToe = new DbTicTacApi
    it('should create new game then move player', async () => {

        const newGame = await ticTacToe.createGame()
        expect(newGame).toBeDefined()
        expect(newGame.id).toBeDefined()
        expect(newGame.currentPlayer).toBe('x')
        //console.log(newGame.currentPlayer);
        expect(newGame.board).toEqual([[null, null, null], [null, null, null], [null, null, null]])
        describe

        let movingGame = await ticTacToe.makeMove(newGame.id, 2, 2)
        expect(movingGame).toBeDefined()
        expect(movingGame.board[2][2]).toBe('x')



    })
})
