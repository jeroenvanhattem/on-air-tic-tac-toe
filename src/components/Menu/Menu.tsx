import { ResetButton } from "./ResetButton"
import { UndoButton } from "./UndoButton"

import styles from './Menu.module.scss'

export const Menu = () => {
  return (
    <div className={styles.Menu}>
      <ResetButton />
      <UndoButton />
    </div>
  )
}