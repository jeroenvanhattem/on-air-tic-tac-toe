import { useSelector } from "react-redux"
import { TileIcon } from "../Tile/TileIcon"

import styles from './Score.module.scss'

export const Score = () => {
  const { wins } = useSelector((state: any) => state?.game)

  return (
    <div className={styles.Score}>
      <div className={styles.ScoreItem} id={styles.X}>
        <TileIcon content='x' id={'x'} />
        <h1>{wins.x}</h1>
      </div>
      <div className={styles.ScoreItem} id={styles.O}>
        <TileIcon content='o' id='X' />
        <h1>{wins.o}</h1>
      </div>
    </div>
  )
}