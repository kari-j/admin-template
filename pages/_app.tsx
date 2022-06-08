import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { RecoilRoot, useRecoilValue } from 'recoil'
import '../styles/globals.css'
import { HomeAppBar } from './components/AppBar'
import { MainFooter } from './components/Footer'
import { PageSidebar } from './components/Sidebar'
import { AdminHomeSidebarNav } from './constants/nav'
import { useSelect } from './hooks/useInput'
import { atomIsLogin } from './stores'

const CustomeApp = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, {}>
  pageProps: any
}) => {
  // 기존 dark mode 여도 무조건 light 모드로 나오도록
  const toggleDarkTheme = () => {
    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'dark') {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      }
    }
  }

  const router = useRouter()
  const isLogin = useRecoilValue(atomIsLogin)
  useEffect(() => {
    if (!isLogin) {
      router.push('/login')
    }
    //dark mode toggle
    toggleDarkTheme()
  }, [])

  const [select, handleSelect] = useSelect('publish-list')
  return (
    <Fragment>
      {isLogin ? (
        <Fragment>
          <HomeAppBar />
          <main className="flex h-[90vh] overflow-auto dark:bg-slate-900">
            <Head>
              <title>플래너 어드민</title>
            </Head>
            <PageSidebar
              select={select}
              navInfos={AdminHomeSidebarNav}
              handleVal={handleSelect}
            />
            <Component {...pageProps} />
          </main>
          <MainFooter />
        </Fragment>
      ) : (
        <Fragment>
          <main className="flex h-[95vh] dark:bg-slate-900">
            <Component {...pageProps} />
          </main>
          <MainFooter />
        </Fragment>
      )}
    </Fragment>
  )
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <div className="min-h-screen">
        <Head>
          <title>엔진 어드민 | 로그인</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CustomeApp Component={Component} pageProps={pageProps} />
      </div>
    </RecoilRoot>
  )
}

export default App
