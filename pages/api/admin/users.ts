import jwtAxios from '../../hooks/useAxios'

export interface IUsers {
  createdAt: string
  updatedAt: string
  deletedAt: string
  name: string
  nickname: string
  email: string
  phone: string
  password: string
  id: number
  uuid: string
  type: string
  level: number
  active: boolean
}

export const getUsers = async () => {
  //param 있으면 작성
  try {
    const response = await jwtAxios.get<IUsers>(`/admin/users`)
    return response.data || []
  } catch (error: any) {
    throw new Error(`Axios getUsers Error!! : ${error.message}`)
  }
}
