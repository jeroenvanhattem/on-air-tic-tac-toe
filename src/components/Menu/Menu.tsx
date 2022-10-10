import React from 'react'
import { ResetButton } from "./ResetButton"
import { UndoButton } from "./UndoButton"
import { ExitButton } from "./ExitButton"

import styles from './Menu.module.scss'

export const Menu = () => {
  return (
    <div className={styles.Menu}>
      <ResetButton />
      <UndoButton />
      <ExitButton />
    </div>
  )
}