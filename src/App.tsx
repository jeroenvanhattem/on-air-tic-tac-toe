import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { Board } from './components/Board'
import { OnAirLogo } from './components/Logo/OnAirLogo'
import { TicTacToeLogo } from './components/Logo/TicTacToeLogo'
// import OnAir from './assets/on-air.svg'


const App = () => {
  const dispatch = useDispatch()
  const { test } = useSelector((state: any) => state?.main)

  useEffect(() => {
    console.log('test: ', test)
  }, [test])

  return (
    <div className="App">
      <div className='Header'>
        <OnAirLogo />
        <TicTacToeLogo />
      </div>
      <div className='Container'>
        <Board />
      </div>

    </div>
  )
}

export default App
