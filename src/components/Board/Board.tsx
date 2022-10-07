import { useEffect, useState } from "react"
import { checkWin } from "../../functions/checkWin"
import { BoardType } from "../../types/Board"
import styles from "./Board.module.scss"

export const Board = () => {

  // MOVE ALL OF THIS TO REDUX 

  const [testBoard, setTestBoard] = useState<any>([
    ['o', 'x', 'x'],
    ['o', 'x', 'o'],
    ['x', 'o', 'x'],
  ])

  const [currentMover, setCurrentMover] = useState<string>('x')
  const [moves, setMoves] = useState<any>(0) // [index of cell, mover]
  const [gridSize, setGridSize] = useState<number>(3)

  useEffect(() => {
    if (testBoard) {
      const result = checkWin({ board: testBoard, currentMover })
      console.log('Result: ', result)
      console.log(result ? `You won as ${currentMover}` : `You lost as ${currentMover}`)
    }
  }, [testBoard])

  return (
    <div className={styles.Board}>
      {[...Array(gridSize)].map((_, i) => {
        return (
          <div className={styles.Row}>
            {
              [...Array(gridSize)].map((_, j) => {
                return (
                  <div
                    className={styles.Cell}
                    onClick={() => { console.log('Clicked cell: ', i, j) }}
                  >
                  </div>
                )
              })
            }
          </div >
        )
      })
      }
    </div >
  )
}