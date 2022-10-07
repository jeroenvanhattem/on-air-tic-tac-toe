import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { checkWin } from "../../functions/checkWin"
import { generateBoard } from "../../functions/generateBoard"
import { updateBoard } from "../../functions/updateBoard"
import { BoardType } from "../../types/Board"
import { TileIcon } from "../Tile/TileIcon"
import styles from "./Board.module.scss"

export const Board = () => {
  const dispatch = useDispatch()

  const [board, setBoard] = useState<any>(null)
  const { gridSize } = useSelector((state: any) => state?.board)
  const { currentMover, moves } = useSelector((state: any) => state?.game)

  const makeMove = (position: [number, number]) => {
    const [row, col] = position
    console.log(position)
    if (board[row][col] === '') {
      const move = { mover: currentMover, position }
      dispatch({ type: 'ADD_MOVE', payload: move })
      dispatch({ type: 'SET_CURRENT_MOVER', payload: currentMover === 'x' ? 'o' : 'x' })
    } else {
      console.log('Already occupied')
    }
  }

  useEffect(() => {
    const newBoard = generateBoard(gridSize)
    setBoard(newBoard)
  }, [])

  useEffect(() => {
    // Execute the moves on the board using a command pattern.
    console.log('Moves', moves)
    const newBoard = updateBoard({ moves, gridSize })
    setBoard(newBoard)
    const win = checkWin({ board: newBoard, currentMover: currentMover === 'x' ? 'o' : 'x' })
    if (win) {
      dispatch({ type: 'SET_WINNER', payload: currentMover === 'x' ? 'o' : 'x' })
    }
  }, [moves])

  return (
    <div className={styles.Board}>
      {board && [...Array(gridSize)].map((_, i) => {
        return (
          <div className={styles.Row}>
            {
              [...Array(gridSize)].map((_, j) => {
                return (
                  <div
                    className={styles.Cell}
                    onClick={() => { makeMove([i, j]) }}
                  >
                    {board[i][j] !== '' ?
                      <TileIcon content={board[i][j]} /> : ''}
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