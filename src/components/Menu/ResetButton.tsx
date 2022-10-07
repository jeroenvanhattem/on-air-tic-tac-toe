import { useDispatch } from 'react-redux'
import styles from './ResetButton.module.scss'

export const ResetButton = () => {
  const dispatch = useDispatch()
  return (
    <button
      className={styles.ResetButton}
      onClick={() => { dispatch({ type: 'CLEAR_GAME' }) }}
    >
      Reset
    </button>
  )
}