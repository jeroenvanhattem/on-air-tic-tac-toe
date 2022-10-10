import React from 'react'
import { useSelector } from "react-redux"
import { TileIcon } from "../Tile/TileIcon"

import styles from './CurrentMover.module.scss'

export const CurrentMover = () => {
  const { currentMover } = useSelector((state: any) => state?.game)

  return (
    <div className={styles.CurrentMover}>
      <h1>Currently moving</h1>
      <TileIcon content={currentMover} id="currently moving" />
    </div>
  )
}