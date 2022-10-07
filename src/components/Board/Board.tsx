import { useEffect, useState } from "react"
import { checkWin } from "../../functions/CheckWin"
import { BoardType } from "../../types/Board"
import "./Board.scss"

export const Board = () => {
  const testBoard = useState<any>([
    ['x', 'x', 'x'],
    ['o', '', 'o'],
    ['o', 'x', 'o']
  ])


  useEffect(() => {
    if (testBoard) {
      const result = checkWin({ board: testBoard })
      console.log('Result: ', result)
    }
  }, [testBoard])

  return (
    <div className="Board">
      Board
    </div>
  )
}