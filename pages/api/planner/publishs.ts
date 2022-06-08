import jwtAxios from '../../hooks/useAxios'
import qs from 'qs'

export const getPublishList = async (params: Object) => {
  try {
    const data = qs.stringify(params)
    const response = await jwtAxios.get<IPublishs.Publishs.Output>(
      `publish/list?${data}`
    )
    return response.data || []
  } catch (error: any) {
    throw new Error(`Axios getPublishListPagenation Error!! : ${error.message}`)
  }
}
