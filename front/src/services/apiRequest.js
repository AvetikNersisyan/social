import axios from 'axios'

const API_URL = 'http://localhost:8080/'

export const apiRequest = ( { params, body, url, headers, method }) => {
    
    if(!headers) {
        headers = {}
    }

    if(!body) {
        body = {}
    }

    if(!params) {
        params = {}
    }


    
    switch(method.toUpperCase()) {
        case 'GET':{
            return axios.get(`${API_URL}${url}`, {
                headers,
                
            }) 
        }
        case 'POST': {
            return axios.post(`${API_URL}${url}`, body, {
                headers,
            })
        }
    }



}