import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { HomeAppBarNav } from '../constants/nav'
import { useToggle } from '../hooks/useInput'
import { atomIsLogin } from '../stores'

export const HomeAppBar = () => {
  const [open, toggle, setOpen] = useToggle()
  const [isLogin, setIsLogin] = useRecoilState(atomIsLogin)
  const router = useRouter()
  const path = router.asPath
  const selectNavCss =
    'block w-full rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-300'
  const unSelectNavCss =
    'block w-full border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
  const handleToggle = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }
  const handleLogout = () => {
    setIsLogin(false)
    router.push('/login')
  }
  return (
    <nav className="h-[100%] border-gray-200 bg-white bg-gray-200 px-2 py-1.5 dark:bg-gray-800 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a
          href="https://myrealplan.co.kr/"
          className="flex items-center"
          target={'_blank'}
        >
          <img
            src="/bodoc-96x96.png"
            className="mr-3 h-6 sm:h-9"
            alt="Bodoc Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Bodoc
          </span>
        </a>
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded="false"
          onClick={handleToggle}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            open ? '' : 'hidden '
          }md:w-auto" id="mobile-menu w-full md:contents`}
        >
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
            {HomeAppBarNav.map((nav) => {
              return (
                <li key={nav.href}>
                  <Link href={nav.href}>
                    <button
                      className={`${
                        path === nav.href ? selectNavCss : unSelectNavCss
                      }`}
                    >
                      {nav.name}
                    </button>
                  </Link>
                </li>
              )
            })}
            <li>
              <button onClick={handleLogout} className={unSelectNavCss}>
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
