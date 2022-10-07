import styles from './TileIcon.module.scss'

export const TileIcon = ({ content, id }: { content: string, id: string }) => {
  const color = content === 'x' ? '#fc4d3c' : '#3cebfc'

  const style = {
    color,
    textShadow: `0 0 24px ${color}`
  }

  return (
    <div className={styles.TileIcon} key={id}>
      <h1 style={style}>{content}</h1>
    </div>
  )
}