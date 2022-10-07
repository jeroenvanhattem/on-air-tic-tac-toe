import { useEffect, useState } from "react"
import { checkWin } from "../../functions/checkWin"
import { BoardType } from "../../types/Board"
import "./Board.scss"

export const Board = () => {
  const [testBoard, setTestBoard] = useState<any>([
    ['x', 'x', 'x'],
    ['o', '', 'o'],
    ['o', 'x', 'o']
  ])

  const [currentMove, setCurrentMove] = useState<string>('x')


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