import type { NextPage } from 'next'
import Head from 'next/head'

const Management: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center py-2">
      <Head>
        <title>엔진 어드민 | 데이터 관리</title>
      </Head>
      <main className="flex w-full flex-1 flex-col justify-center px-20 text-center">
        데이터 관리
      </main>
    </div>
  )
}

export default Management
