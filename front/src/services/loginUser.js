import { useState } from "react"
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/reducers/user'
import { setToken } from '../utils'
import { apiRequest } from "./apiRequest"
import { API_STATUS } from './constants'


export const useLoginUser = () => {
  const [status, setStatus] = useState(API_STATUS.INITIAL)
  const [res, setRes] = useState([])
  const dispatch = useDispatch()

  const fetch = (body) => {
    setStatus(API_STATUS.LOADING)

    apiRequest({
      url: 'auth/login',
      method: 'POST',
      body,
    }).then(response => {
      setStatus(API_STATUS.SUCCESS)
      setRes(response.data)
      if(response.status === 200 && response.data.success) {
         setToken(response.data.token)

        dispatch(setUser({ isAuth: true}))
      }
    }).catch(e => {
      setStatus(API_STATUS.FAIL)
      setRes(e)
    })
  }

  return {
    status,
    res,
    fetch
  }


}
