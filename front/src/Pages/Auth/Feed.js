import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { Feed } from '../../Components/FeedItem.js'
import { MainLayout } from '../../Components/MainLayout'
import { useGetFeedData } from '../../services/getFeedData.js'


export const MainFeed = () => {

  const { fetch, res, status} =    useGetFeedData()

  const [data, setData] = useState([])
  useEffect(() => {
    fetch()
  }, [])

  return (
    <MainLayout>
      <Container>
        <Feed data={res}/>


      </Container>
    </MainLayout>)
}
