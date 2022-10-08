import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { aiMoves } from "../../functions/aiMove"
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
  const { currentMover, moves, finished, cpu } = useSelector((state: any) => state?.game)

  const makeMove = (position: [number, number]) => {
    const [row, col] = position
    if (board[row][col] === '' && !finished) {
      const move = { mover: currentMover, position }
      dispatch({ type: 'ADD_MOVE', payload: move })
      if (cpu && !finished) {
        aiMakeMove()
      } else {
        dispatch({ type: 'SET_CURRENT_MOVER', payload: currentMover === 'x' ? 'o' : 'x' })
      }
    } else {
      console.log('Already occupied')
    }
  }

  const aiMakeMove = () => {
    const move = aiMoves({ moves, gridSize })
    console.log('AI move: ', move)
    dispatch({ type: 'ADD_MOVE', payload: move })
  }

  useEffect(() => {
    const newBoard = generateBoard(gridSize)
    setBoard(newBoard)
  }, [])

  useEffect(() => {
    // Execute the moves on the board using a command pattern.
    const newBoard = updateBoard({ moves, gridSize })
    setBoard(newBoard)
    let win: any = ''
    if (!cpu) win = checkWin({ board: newBoard, currentMover: currentMover === 'x' ? 'o' : 'x' })
    if (cpu) {
      console.log('Checking for win')
      win = checkWin({ board: newBoard, currentMover: 'x' })
      console.log('Checking with board:', newBoard)
      console.log('Win: ', win)
      if (win !== 'x' && win !== 'o') win = checkWin({ board: newBoard, currentMover: 'o' })
      console.log('Win: ', win)
    }
    if (!win && moves.length === gridSize * gridSize) {
      dispatch({ type: 'SET_WINNER', payload: 'draw' })
    }
    if (win === 'x' || win === 'o') {
      dispatch({ type: 'SET_WINNER', payload: win })
    }
  }, [moves])

  return (
    <div className={styles.Board}>
      {board && [...Array(gridSize)].map((_, i) => {
        return (
          <div className={styles.Row} key={`${i}`}>
            {
              [...Array(gridSize)].map((_, j) => {
                return (
                  <div
                    className={styles.Cell}
                    onClick={() => { makeMove([i, j]) }}
                    key={`cell-${i}-${j}`}
                  >
                    {board[i][j] !== '' ?
                      <TileIcon content={board[i][j]} id={`tile-${i}-${j}`} /> : ''}
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