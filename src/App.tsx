import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { Board } from './components/Board'
import { OnAirLogo } from './components/Logo/OnAirLogo'
import { TicTacToeLogo } from './components/Logo/TicTacToeLogo'
import { Menu } from './components/Menu/Menu'

const App = () => {
  const dispatch = useDispatch()
  const { winner } = useSelector((state: any) => state?.game)

  const style = {
    backgroundColor: winner ? winner === 'x' ? '#fc4d3c' : '#3cebfc' : 'black'
  }

  return (
    <div className="App" style={style}>
      <div className='Header'>
        <OnAirLogo />
        <TicTacToeLogo />
      </div>
      <div className='Container'>
        <Menu />
        <Board />
      </div>

    </div>
  )
}

export default App
