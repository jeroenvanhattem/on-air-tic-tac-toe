import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Board } from '../Board'
import { Menu } from '../Menu/Menu'
import styles from './StartScreen.module.scss'

export const StartScreen = () => {
  const dispatch = useDispatch()
  const { winner, gameStarted, cpu } = useSelector((state: any) => state?.game)
  const { gridSize } = useSelector((state: any) => state?.board)

  const start = () => {
    dispatch({ type: 'SET_GAME_STARTED', payload: true })
  }

  const setGridSize = (size: string) => {
    dispatch({ type: 'SET_GRID_SIZE', payload: parseInt(size) })
  }

  const setCPU = (value: boolean) => {
    dispatch({ type: 'SET_CPU', payload: value })
  }

  const selectedButton = {
    backgroundColor: '#fc4d3c',
    color: 'white'
  }

  return (
    <div className="StartScreen">
      <div className={styles.Container}>
        <h2>Grid size</h2>
        <div className={styles.GridSetup}>
          <button className={styles.GridButton} onClick={() => setGridSize(gridSize > 3 ? gridSize - 1 : gridSize)}>-</button>
          <div className={styles.GridSize}>
            {gridSize}
          </div>
          <button className={styles.GridButton} onClick={() => setGridSize(gridSize < 9 ? gridSize + 1 : gridSize)}>+</button>
        </div>

        <h2>Playing solo or with a friend?</h2>
        <div className={styles.Players}>
          <button onClick={() => setCPU(true)} className={styles.Button} style={cpu ? selectedButton : {}}>
            1 player
          </button>

          <button onClick={() => setCPU(false)} className={styles.Button} style={!cpu ? selectedButton : {}}>
            2 players
          </button>
        </div>

        <button
          onClick={start}
          className={styles.StartButton}
        >Let's start!</button>
      </div>
    </div >
  )
}

