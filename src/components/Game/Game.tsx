import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Board } from '../Board'
import { Menu } from '../Menu/Menu'
import styles from './Game.module.scss'

export const Game = () => {
  const dispatch = useDispatch()
  const { winner, gameStarted } = useSelector((state: any) => state?.game)

  return (
    <div className={styles.Game}>
      <Menu />
      <Board />
    </div>

  )
}

