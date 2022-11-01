import { useState } from "react"
import { apiRequest } from "./apiRequest"
import { API_STATUS } from './constants'


export const useAddUser = () => {
    const [status, setStatus] = useState(API_STATUS.INITIAL)
    const [res, setRes] = useState([])

  const fetch = (body) => {
    apiRequest({
        url: 'auth/signup',
        method: 'POST',
        body,
    }).then(response => {
        setStatus(API_STATUS.SUCCESS)
        setRes(response.data)
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