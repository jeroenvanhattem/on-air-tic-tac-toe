import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { Board } from './components/Board'
import { Game } from './components/Game/Game'
import { OnAirLogo } from './components/Logo/OnAirLogo'
import { TicTacToeLogo } from './components/Logo/TicTacToeLogo'
import { StartScreen } from './components/StartScreen/StartScreen'
import Confetti from 'react-confetti'

const App = () => {
  const dispatch = useDispatch()
  const { winner, started } = useSelector((state: any) => state?.game)

  const style = {
    backgroundColor: winner ? winner === 'x' ? '#fc4d3c' : '#3cebfc' : 'black'
  }

  return (
    <div className="App" style={style}>
      {winner &&
        <Confetti />}
      <div className='Header'>
        <OnAirLogo />
        <TicTacToeLogo />
      </div>
      <div className='Container'>
        {started
          ? <Game />
          : <StartScreen />}
      </div>

    </div>
  )
}

export default App
