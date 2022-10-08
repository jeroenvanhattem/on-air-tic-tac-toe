import { useDispatch } from 'react-redux'
import styles from './ExitButton.module.scss'

export const ExitButton = () => {
  const dispatch = useDispatch()

  const exit = () => {
    dispatch({ type: 'CLEAR_GAME' })
    dispatch({ type: 'SET_GAME_STARTED', payload: false })
    dispatch({ type: 'CLEAR_WINS', payload: false })
  }

  return (
    <button
      className={styles.ExitButton}
      onClick={exit}
    >
      Exit
    </button>
  )
}