import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import PublishList from './publish/list'
import { atomIsLogin } from './stores'

const Home: NextPage = () => {
  const isLogin = useRecoilValue(atomIsLogin)

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <Head>
        <title>엔진 어드민 | 홈</title>
      </Head>
      <main className="flex h-full w-full flex-1 flex-col text-center">
        {isLogin ? <PublishList /> : null}
      </main>
    </div>
  )
}

export default Home
