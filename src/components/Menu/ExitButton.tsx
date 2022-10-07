import { useDispatch } from 'react-redux'
import styles from './ExitButton.module.scss'

export const ExitButton = () => {
  const dispatch = useDispatch()
  return (
    <button
      className={styles.ExitButton}
      onClick={() => { dispatch({ type: 'UNDO_MOVE' }) }}
    >
      Exit
    </button>
  )
}