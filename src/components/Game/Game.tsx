import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Board } from '../Board'
import { Menu } from '../Menu/Menu'
import { TileIcon } from '../Tile/TileIcon'
import styles from './Game.module.scss'

export const Game = () => {
  const dispatch = useDispatch()
  const { winner, gameStarted } = useSelector((state: any) => state?.game)

  const style = {
    color: winner ? winner === 'x' ? '#fc4d3c' : '#3cebfc' : 'black'
  }

  return (
    <div className={styles.Game}>
      <Menu />
      <Board />
      {winner && <h1 style={style}>We have a winner!</h1>}
      {winner && <TileIcon content={winner} />}
    </div>

  )
}

