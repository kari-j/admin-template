import { NextPage } from 'next'
import Head from 'next/head'
import { PageSidebar } from '../../Sidebar'
import { UserManagement } from './userManagement/index'
import { AdminHomeSidebarNav } from '../../constants/nav'
import { useSelect } from '../../hooks/useInput'

const Admin: NextPage = () => {
  const [select, handleSelect] = useSelect('overall-manual')
  return (
    <div>
      <Head>
        <title>플래너 어드민</title>
      </Head>
      <main className="flex w-full flex-col text-left">
        <PageSidebar navInfos={AdminHomeSidebarNav} handleVal={handleSelect} />
        <div className="h-full w-full pl-60">
          {select === 'user-management' && <UserManagement />}
        </div>
      </main>
    </div>
  )
}

export default Admin
