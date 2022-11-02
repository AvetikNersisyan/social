import { Container } from '@mui/system'
import { FeedItem } from './FeedItem'


export const ProfileFeed = ({ data }) => {

  return (
    <Container style={{
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '2rem'
    }}>
      {
        data.map((item) => {
          return <FeedItem key={item.title} {...item} />
        })
      }
    </Container>
  )
}
