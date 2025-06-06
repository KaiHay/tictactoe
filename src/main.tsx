import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import GameView from './GameView.tsx'
import { GameLobby } from './gameLobby.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ClientTicTacAPI } from './api.ts'
import App from './App.tsx'
const api = new ClientTicTacAPI()

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: GameLobby
      },
      {
        path: "/game/:gameID",
        Component: GameView,
        loader: async ({ params }) => {
          if (!params.gameID) {
            throw new Error("Game ID required")
          }
          console.log(params.gameID)
          const game = await api.getGame(params.gameID)
          return { game }
        }
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
