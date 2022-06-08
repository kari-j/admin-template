import { useRouter } from 'next/router'

const PublishDetail = () => {
  const router = useRouter()
  const { id } = router.query
  return <div className="w-full p-10">디테일 페이지 id: {id}</div>
}

export default PublishDetail
