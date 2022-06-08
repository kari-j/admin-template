import type { NextPage } from 'next'
import Head from 'next/head'

const Contact: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center py-2">
      <Head>
        <title>엔진 어드민 | 고객의 소리</title>
      </Head>
      <main className="flex w-full flex-1 flex-col justify-center px-20 text-center">
        고객의 소리
      </main>
    </div>
  )
}

export default Contact
