import Link from 'next/link'

export const PageSidebar = (props: {
  select: string
  navInfos: {
    name: string
    state: string
    href: string
    img: JSX.Element
  }[]
  selectMenu: (id: string, e: any) => void
  handleVal: (e: any) => void
}) => {
  const { select, navInfos, handleVal } = props

  const selectNav =
    'flex w-full items-center rounded-lg p-2 text-base font-normal text-white bg-gray-100 text-gray-900 dark:text-white dark:bg-gray-700'
  const unSelectNav =
    'flex w-full items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700'
  return (
    <aside className="top-12 h-full w-60" aria-label="Sidebar">
      <div className="h-[90vh] bg-slate-900 py-4 px-3 dark:bg-gray-800">
        <ul className="space-y-2">
          {navInfos.length ? (
            navInfos.map((navInfo) => {
              return (
                <li key={navInfo.state}>
                  <Link href={navInfo.href}>
                    <button
                      id={navInfo.state}
                      className={
                        navInfo.state === select
                          ? `${selectNav}`
                          : `${unSelectNav}`
                      }
                      onClick={handleVal}
                    >
                      {navInfo.img}
                      <span className="ml-3">{navInfo.name}</span>
                    </button>
                  </Link>
                </li>
              )
            })
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    </aside>
  )
}
