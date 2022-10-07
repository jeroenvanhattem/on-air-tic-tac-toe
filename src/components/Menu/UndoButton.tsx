import { useDispatch } from 'react-redux'
import styles from './UndoButton.module.scss'

export const UndoButton = () => {
  const dispatch = useDispatch()
  return (
    <button
      className={styles.UndoButton}
      onClick={() => {
        dispatch({ type: 'CLEAR_GAME' })
        dispatch({ type: 'SET_GAME_STARTED', payload: false })
      }}
    >
      Undo
    </button>
  )
}