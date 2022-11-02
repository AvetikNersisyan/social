import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { FeedItem } from '../Components/FeedItem.js/FeedItem'
import { Loader } from '../Components/Loader'
import { MainLayout } from '../Components/MainLayout'
import { API_STATUS } from '../services/constants'
import { useGetMainFeed } from '../services/getMainFeed'


export const MainFeed = () => {

  const { fetch, res, status } = useGetMainFeed()

  const [data, setData] = useState([])

  useEffect(() => {
    fetch()
  }, [])

  if (status !== API_STATUS.SUCCESS) {
    return (
      <MainLayout>
        <Loader/>
      </MainLayout>
    )
  }

  console.log(res, 'response main')
  return (
    <MainLayout>
      <Container style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '2rem',
      }}>
        {
          res.map((item) => {
            return <FeedItem key={item.title} {...item} />
          })
        }
      </Container>
    </MainLayout>)
}
