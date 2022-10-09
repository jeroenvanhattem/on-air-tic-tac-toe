import { OnAirLogo } from '../Logo/OnAirLogo'
import { TicTacToeLogo } from '../Logo/TicTacToeLogo'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <div className={styles.Header}>
      <OnAirLogo />
      <TicTacToeLogo />
    </div>
  )
}