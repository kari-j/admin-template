import { IUsers } from '../../../api/admin/users'

interface UserListProps {
  users: IUsers[]
}
const userList = (props: UserListProps) => {
  const { users } = props // 이벤트 핸들링 추가되면 추가
  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  )
}

export default userList
