import { atomFamily, GetRecoilValue, selectorFamily } from 'recoil'
import { getPublishList } from '../../api/planner/publishs'

// interface 호출하면 안되는 이슈가 있어서 SerializableParam 형태로 변환시킴.
interface IParam extends IPublishs.Publishs.Input {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
export const publishListSelector = selectorFamily<
  IPublishs.Publishs.Output,
  IParam
>({
  key: 'publishListSelector',
  get:
    (params: IParam) =>
    async ({ get }) => {
      try {
        if (params.startDate === '') {
          return []
        } else {
          const response = await getPublishList(params)
          console.log(response)
          return response || []
        }
      } catch (error) {
        console.error(`publishListState => getPublishListPagenation() ERROR: 
      ${error}`)
        return []
      }
    },
})

export const publishListState = atomFamily<IPublishs.Publishs.Output, IParam>({
  key: 'publishListState',
  default: (param) => publishListSelector(param),
})
