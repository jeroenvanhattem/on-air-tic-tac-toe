import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { aiMoves } from "../../functions/aiMove"
import { checkWin } from "../../functions/checkWin"
import { generateBoard } from "../../functions/generateBoard"
import { updateBoard } from "../../functions/updateBoard"
import { BoardType } from "../../types/Board"
import { MoveType } from "../../types/Game"
import { TileIcon } from "../Tile/TileIcon"
import styles from "./Board.module.scss"

export const Board = () => {
  const dispatch = useDispatch()

  const [board, setBoard] = useState<any>(null)
  const { gridSize } = useSelector((state: any) => state?.board)
  const { currentMover, moves, wins, finished, cpu } = useSelector((state: any) => state?.game)

  const makeMove = (position: [number, number]) => {
    const [row, col] = position
    if (board[row][col] === '' && !finished) {
      const move = { mover: currentMover, position }
      dispatch({ type: 'ADD_MOVE', payload: move })
      if (cpu && !finished) {
        aiMakeMove({ lastMove: move })
      } else {
        dispatch({ type: 'SET_CURRENT_MOVER', payload: currentMover === 'x' ? 'o' : 'x' })
      }
    }
  }

  const afterMove = ({ board }: { board: any }) => {
    let win: any = ''
    if (!cpu) win = checkWin({ board, currentMover: currentMover === 'x' ? 'o' : 'x' })
    if (cpu) {
      win = checkWin({ board, currentMover: 'x' })
      if (win !== 'x' && win !== 'o') win = checkWin({ board, currentMover: 'o' })
    }
    if (!win && moves.length === gridSize * gridSize) {
      dispatch({ type: 'SET_WINNER', payload: 'draw' })
    }
    if (win === 'x' || win === 'o') {
      dispatch({ type: 'SET_WINNER', payload: win })
      dispatch({
        type: 'SET_WINS', payload: { x: wins.x + (win === 'x' ? 1 : 0), o: wins.o + (win === 'o' ? 1 : 0) }
      })
    }
  }

  const letAIMakeUserMove = () => {
    const madeMove = aiMakeMove({ lastMove: null })
    if (madeMove) aiMakeMove({ lastMove: madeMove })
  }

  const aiMakeMove = ({ lastMove }: { lastMove: MoveType | null }) => {
    const move = aiMoves({ board, moves, gridSize, lastMove })
    if (move) {
      dispatch({ type: 'ADD_MOVE', payload: move })
      return move
    }
  }

  useEffect(() => {
    const newBoard = generateBoard(gridSize)
    setBoard(newBoard)
  }, [])

  useEffect(() => {
    // Execute the moves on the board using a command pattern.
    const newBoard = updateBoard({ moves, gridSize })
    setBoard(newBoard)
    afterMove({ board: newBoard })
  }, [moves])

  return (
    <div className={styles.Container}>
      <div className={styles.Board} data-testid="board">
        {
          board && [...Array(gridSize)].map((_, i) => {
            return (
              <div className={styles.Row} key={`${i}`}>
                {
                  [...Array(gridSize)].map((_, j) => {
                    return (
                      <div
                        className={styles.Cell}
                        onClick={() => { makeMove([i, j]) }}
                        key={`cell-${i}-${j}`}
                        data-testid={`cell-${i}-${j}`}
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
      <button className={styles.aiMoveButton} onClick={letAIMakeUserMove} >AI, help me!</button>
    </div>
  )
}