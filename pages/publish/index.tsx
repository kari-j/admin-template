import { NextPage } from 'next'
import Head from 'next/head'
import { useSelect } from '../hooks/useInput'
import { PublishList } from './list'

const Planner: NextPage = () => {
  const [select, handleSelect] = useSelect('publish-list')
  return (
    <div>
      <Head>
        <title>플래너</title>
      </Head>
      <main className="flex w-full flex-col text-left">
        <div className="h-full w-full pl-60">
          <div className="p-10">
            {select === 'publish-list' && <PublishList />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Planner
