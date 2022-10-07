import styles from './TileIcon.module.scss'

export const TileIcon = ({ content }: { content: string }) => {
  return (
    <div className={styles.TileIcon}>
      <h1>{content}</h1>
    </div>
  )
}