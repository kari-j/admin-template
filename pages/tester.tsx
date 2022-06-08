import type { NextPage } from 'next'
import Head from 'next/head'
import { PageSidebar } from './components/Sidebar'
import { OverallManual } from './components/tester/overallManual'
import { TesterSidebarNav } from './constants/nav'
import { useSelect } from './hooks/useInput'

const Tester: NextPage = () => {
  const [select, handleSelect] = useSelect('overall-manual')
  return (
    <div className="flex flex-col justify-center">
      <Head>
        <title>엔진 어드민 | 테스터</title>
      </Head>
      <main className="flex w-full flex-col text-left">
        <PageSidebar navInfos={TesterSidebarNav} handleVal={handleSelect} />
        <div className="h-full w-full pl-60">
          {select === 'overall-manual' && <OverallManual />}
        </div>
      </main>
    </div>
  )
}

export default Tester
