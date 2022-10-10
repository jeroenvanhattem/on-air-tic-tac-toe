import React from "react"
import { assert, describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { store } from "../redux/store"

import { Board } from "../components/Board/Board"
import { renderWithContext } from "../utils/testUtils"
import { Provider } from "react-redux"
import { act } from "react-dom/test-utils"

describe("Board", () => {
  it("Interact with board", () => {
    store.dispatch({ type: "SET_WINNER", payload: "x" })
    const { winner, moves } = store.getState().game
    assert.equal(winner, "x")

    renderWithContext(<Provider store={store}>
      <Board />
    </Provider>)

    const board = screen.getByTestId("board")

    // Board is rendering
    expect(board).toBeTruthy()


    act(() => {
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
    })

    expect(winner).toBe("x")

    console.log(moves)
  })
})
