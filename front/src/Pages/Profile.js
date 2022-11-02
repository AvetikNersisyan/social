import { CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { ProfileFeed } from '../Components/FeedItem.js/NewsFeed'
import { Loader } from '../Components/Loader'
import { MainLayout } from '../Components/MainLayout'
import { API_STATUS } from '../services/constants'
import { useGetFeedData } from '../services/getFeedData'


export const Profile = () => {
  const { fetch, res, status } = useGetFeedData()

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

  return (
    <MainLayout>
      <ProfileFeed data={res}/>
    </MainLayout>
  )
}
