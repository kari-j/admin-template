import Image from 'next/image'

export const MainFooter = () => {
  return (
    <footer className="flex h-[5vh] w-full items-center justify-center bg-slate-300 dark:bg-slate-900">
      <a
        className="flex items-center justify-center text-white"
        href="https://myrealplan.co.kr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="mr-4 text-gray-800">Powered by </span>
        <Image src="/bodoc-32x32.png" alt="Bodoc Logo" width={16} height={16} />
      </a>
    </footer>
  )
}
