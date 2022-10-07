import { useSelector } from "react-redux"
import { TileIcon } from "../Tile/TileIcon"

import styles from './Winner.module.scss'

export const Winner = () => {
  const { winner, gameStarted, currentMover } = useSelector((state: any) => state?.game)
  const style = {
    color: winner ? winner === 'x' ? '#fc4d3c' : '#3cebfc' : 'black'
  }

  return (
    <div className={styles.Winner}>
      <h1 style={style}>We have a winner!</h1>
      <TileIcon content={winner} id='game' />
    </div>
  )
}