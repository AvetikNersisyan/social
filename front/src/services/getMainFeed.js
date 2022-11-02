import { useState } from "react"
import { getToken } from '../utils'
import { apiRequest } from "./apiRequest"
import { API_STATUS } from './constants'


export const useGetMainFeed = () => {
  const [status, setStatus] = useState(API_STATUS.INITIAL)
  const [res, setRes] = useState([])

  console.log(res, 'res')
  const fetch = () => {
    setStatus(API_STATUS.LOADING)
    const token = getToken();
    apiRequest({
      url: 'news/feed',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setStatus(API_STATUS.SUCCESS)
      setRes(response.data.data)
    }).catch(e => {
      setStatus(API_STATUS.FAIL)
    })
  }

  return {
    status,
    res,
    fetch
  }


}
