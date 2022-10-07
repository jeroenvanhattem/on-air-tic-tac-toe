import { useSelector } from "react-redux"
import { TileIcon } from "../Tile/TileIcon"

import styles from './CurrentMover.module.scss'

export const CurrentMover = () => {
  const { winner, gameStarted, currentMover } = useSelector((state: any) => state?.game)
  const style = {
    color: winner ? winner === 'x' ? '#fc4d3c' : '#3cebfc' : 'black'
  }

  return (
    <div className={styles.CurrentMover}>
      <h2>Currently moving</h2>
      <TileIcon content={currentMover} id="currently moving" />
    </div>
  )
}