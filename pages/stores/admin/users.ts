import { atom, selector } from 'recoil'
import { getUsers, IUsers } from '../../api/admin/users'

export const allUsersState = selector<IUsers[]>({
  key: 'allUsersState',
  get: async ({ get }) => {
    try {
      const response = await getUsers()
      return response || []
    } catch (error) {
      console.error(`allUserState => getUsers() ERROR: 
      ${error}`)
      return []
    }
  },
})

export const userListState = atom<IUsers[]>({
  key: 'userListState',
  default: allUsersState,
})
