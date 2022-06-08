import { Fragment } from 'react'
import { useRecoilStateLoadable } from 'recoil'
import { userListState } from '../../../stores/admin/users'
import UserList from './userList'

export const UserManagement = () => {
  const [usersData, setUserState] = useRecoilStateLoadable(userListState)

  if (usersData.state === 'hasError') {
    return <div>에러 발생!</div>
  }
  if (usersData.state === 'loading') {
    return <div>데이터를 불러오고 있습니다..</div>
  }
  if (usersData.state === 'hasValue') {
    return (
      <Fragment>
        <UserList users={usersData.contents} />
      </Fragment>
    )
  }
  return (
    <div>
      <div>데이터가 없습니다</div>
    </div>
  )
}

export default UserManagement
