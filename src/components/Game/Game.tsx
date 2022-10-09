import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Board } from '../Board/Board'
import { CurrentMover } from '../CurrentMover/CurrentMover'
import { Menu } from '../Menu/Menu'
import { Score } from '../Score/Score'
import { TileIcon } from '../Tile/TileIcon'
import { Winner } from '../Winner/Winner'
import styles from './Game.module.scss'

export const Game = () => {
  const dispatch = useDispatch()
  const { winner, gameStarted, currentMover } = useSelector((state: any) => state?.game)

  return (
    <div className={styles.Game}>
      <Menu />
      <div className={styles.Container}>
        <div className={styles.Side}>
          <div className={styles.Score}>
            <Score />
          </div>
        </div>
        <div className={styles.Board} >
          <Board />
        </div>
        <div className={styles.Side}>
          <div className={styles.PlayerInfo}>
            {!winner &&
              <CurrentMover />
            }
            {winner &&
              <Winner />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

