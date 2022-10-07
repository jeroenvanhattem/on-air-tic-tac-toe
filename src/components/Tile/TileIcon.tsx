import styles from './TileIcon.module.scss'

export const TileIcon = ({ content }: { content: string }) => {
  const color = content === 'x' ? '#fc4d3c' : '#3cebfc'

  const style = {
    color,
    textShadow: `0 0 24px ${color}`
  }

  return (
    <div className={styles.TileIcon}>
      <h1 style={style}>{content}</h1>
    </div>
  )
}