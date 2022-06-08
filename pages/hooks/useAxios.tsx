import axios from 'axios'

// 추후 환경변수로 뺄 것
const jwtAxios = axios.create({
  baseURL: 'http://192.168.0.11:8080/api/v1',
  headers: {
    'content-type': 'application/json',
  },
  timeout: 5000,
})

//inteceptors write

export default jwtAxios
