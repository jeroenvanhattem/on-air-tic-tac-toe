import React, { StrictMode } from "react"
import { assert, describe, beforeAll, expect, it } from "vitest"
import { render, screen, fireEvent, act } from "@testing-library/react"
import { store } from "../redux/store"

import { Board } from "../components/Board/Board"
import { renderWithContext } from "../utils/testUtils"
import { Provider } from "react-redux"
import { generateBoard } from "../functions/generateBoard"
import { updateBoard } from "../functions/updateBoard"
import { checkWin } from "../functions/checkWin"
// import { act, } from "react-dom/test-utils"

describe("Board", () => {
  beforeAll(() => {
    store.dispatch({ type: "CLEAR_GAME" })
    store.dispatch({ type: "SET_CPU", payload: false })
  })

  it("Play game", () => {
    // const { winner, moves } = store.getState().game

    renderWithContext(<Provider store={store}>
      <Board />
    </Provider>)

    const boardComponent = screen.getByTestId("board")

    // Board is rendering
    expect(boardComponent).toBeTruthy()

    const cellOne = screen.getByTestId("cell-0-0")
    expect(cellOne).toBeTruthy()

    // X moving
    screen.getByTestId("cell-0-0").click()
    // O moving
    screen.getByTestId("cell-0-1").click()
    // X moving
    screen.getByTestId("cell-1-1").click()
    // O moving
    screen.getByTestId("cell-1-0").click()
    // X moving
    screen.getByTestId("cell-2-2").click()
    // X should have won on the 3x3 board

    const { moves } = store.getState().game
    const board = updateBoard({ moves, gridSize: 3 })
    const winner = checkWin({ board, currentMover: "x" })

    expect(winner).toBe("x")

  })
})
