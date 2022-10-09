import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './App.module.scss'
import { Board } from './components/Board/Board'
import { Game } from './components/Game/Game'
import { OnAirLogo } from './components/Logo/OnAirLogo'
import { TicTacToeLogo } from './components/Logo/TicTacToeLogo'
import { StartScreen } from './components/StartScreen/StartScreen'
import Confetti from 'react-confetti'
import { Header } from './components/Header/Header'

const App = () => {
  const dispatch = useDispatch()
  const { winner, started } = useSelector((state: any) => state?.game)

  return (
    <div className={styles.App}>
      {(winner === 'x' || winner === 'o') &&
        <Confetti />}
      <Header />
      <div className={styles.Container}>
        {started
          ? <Game />
          : <StartScreen />}
      </div>

    </div>
  )
}

export default App
