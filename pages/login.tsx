import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Success, Warning } from './components/Alerts'
import { ID_PASS_ERR, LOGIN_SUCCESS } from './constants/text'
import { useText, useToggle } from './hooks/useInput'
import { atomIsLogin } from './stores'
import { delay } from './utils/TimeUtils'

const Login: NextPage = () => {
  const [isLogin, setIsLogin] = useRecoilState(atomIsLogin)
  const router = useRouter()
  const [email, handleEmail] = useText()
  const [password, handlePassword] = useText()
  const [alertLoginSucces, toggleAlertLoginSuccess, setAlertLoginSuccess] =
    useToggle()
  const [alertLoginWarning, toggleAlertLoginWarning, setAlertLoginWarning] =
    useToggle()
  const handleLogin = async () => {
    if (email.length >= 5 && password.length >= 5) {
      setAlertLoginSuccess(true)
      await delay(1000)
      setAlertLoginSuccess(false)
      setIsLogin(true)
      router.push('/')
    } else {
      setAlertLoginWarning(true)
      await delay(1500)
      setAlertLoginWarning(false)
    }
  }
  useEffect(() => {
    if (isLogin) {
      router.push('/')
    }

    console.log('islogin', isLogin)
  }, [])
  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-2">
      <Head>
        <title>엔진 어드민 | 로그인</title>
      </Head>
      {alertLoginSucces && (
        <div className={`fixed bottom-20`}>
          <Success title="로그인 성공" text={LOGIN_SUCCESS} />
        </div>
      )}
      {alertLoginWarning && (
        <div className="fixed bottom-20">
          <Warning title="로그인 실패" text={ID_PASS_ERR} />
        </div>
      )}
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="mb-4 flex flex-col rounded bg-slate-600 px-8 pt-6 pb-8 shadow-xl shadow-slate-500/50 ">
          <div className="text-md font-semi mb-5 text-white">
            엔진 어드민 로그인
          </div>
          <div className="mb-4">
            <label
              className="text-grey-darker mb-2 block text-left text-sm font-bold text-white"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              className="text-grey-darker w-full appearance-none rounded border py-2 px-3 shadow"
              id="email"
              type="text"
              placeholder="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="mb-6">
            <label
              className="text-grey-darker mb-2 block text-left text-sm font-bold text-white"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              className="border-red text-grey-darker w-full appearance-none rounded border py-2 px-3 shadow"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={handlePassword}
            />
            <p className="text-right">
              <a
                className="hover:text-blue-darker font-emi inline-block text-right align-baseline text-xs text-gray-200"
                href="#"
              >
                이메일 / 비밀번호 찾기
              </a>
            </p>
          </div>
          <div className="text-center">
            <button
              className="hover:bg-indigo-dark rounded bg-green-500 py-2 px-4 font-bold text-white"
              onClick={handleLogin}
            >
              로그인
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
