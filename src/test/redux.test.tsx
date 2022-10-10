import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { assert, describe, expect, it } from "vitest"
import { store } from '../redux/store'

describe("Redux", () => {
  it("Update winner state", () => {
    store.dispatch({ type: "SET_WINNER", payload: "x" })
    const { winner } = store.getState().game
    assert.equal(winner, "x")
  })
})
