import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Board } from '../Board'
import { CurrentMover } from '../CurrentMover/CurrentMover'
import { Menu } from '../Menu/Menu'
import { TileIcon } from '../Tile/TileIcon'
import { Winner } from '../Winner/Winner'
import styles from './Game.module.scss'

export const Game = () => {
  const dispatch = useDispatch()
  const { winner, gameStarted, currentMover } = useSelector((state: any) => state?.game)

  return (
    <div className={styles.Game}>
      <Menu />
      <Board />
      {!winner &&
        <CurrentMover />
      }
      {winner &&
        <Winner />
      }
    </div>

  )
}

