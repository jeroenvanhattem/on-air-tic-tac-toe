import { useDispatch } from 'react-redux'
import styles from './UndoButton.module.scss'

export const UndoButton = () => {
  const dispatch = useDispatch()
  return (
    <button
      className={styles.UndoButton}
      onClick={() => {
        dispatch({ type: 'UNDO_MOVE' })
      }}
    >
      Undo
    </button>
  )
}