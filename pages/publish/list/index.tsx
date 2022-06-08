import React, { useEffect, useState } from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
// import { searchParamState } from '../../stores/publish/publish'
import { CustomerSearch } from '../../utils/CustomerSearch'
import { DatePickerRange } from '../../utils/DatePickers'
import { SelectPlanner } from '../../utils/SelectPlanner'
import { Lists } from './lists'
import SearchIcon from '@mui/icons-material/Search'
import moment from 'moment'
import {
  gridPageState,
  gridPageSizeState,
  gridSortState,
  gridSortModelState,
} from '../../components/DataGrid'

export const PublishList = () => {
  const initStartDate = moment().add(-2, 'months').startOf('day').toDate()
  const initEndDate = moment().endOf('day').toDate()
  const [keyword, setKeyword] = useState<string>('')

  // API parameter default
  const [startDate, setStartDate] = useState(
    moment(initStartDate).format('YYYY-MM-DD HH:mm:ss')
  )
  const [endDate, setEndDate] = useState(
    moment(initEndDate).format('YYYY-MM-DD HH:mm:ss')
  )
  // 자식컴포넌트 데이터값 가져오기
  const searchDate = (dateRange: string[]) => {
    setStartDate(dateRange[0])
    setEndDate(dateRange[1])
  }
  const searchKeyword = (keyword: string) => {
    setKeyword(keyword)
  }
  const page = useRecoilValue(gridPageState)
  const pageSize = useRecoilValue(gridPageSizeState)
  const sort = useRecoilValue(gridSortState)

  const [params, setParams] = useState<IPublishs.Publishs.Input>({
    keyword: keyword, // 검색어
    startDate: startDate, // 검색시작일
    endDate: endDate, // 검색종료일
    page: page, // 현재페이지
    size: pageSize, // 검색 row 수
    status: 'COMPLETE', // 상담 상태
    sort: '', // 정렬 column#ASC/DESC
  })

  useEffect(() => {
    setParams({
      startDate: startDate,
      endDate: endDate,
      keyword: keyword,
      page: page,
      size: pageSize,
      status: 'COMPLETE',
      sort: sort,
    })
  }, [page, sort, pageSize])

  const resetpage = useResetRecoilState(gridPageState)
  const resetpageSize = useResetRecoilState(gridPageSizeState)
  const resetSort = useResetRecoilState(gridSortState)
  const resetSortModel = useResetRecoilState(gridSortModelState)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //atom Reset
    resetpage()
    resetpageSize()
    resetSort()
    resetSortModel()

    setParams({
      startDate: startDate,
      endDate: endDate,
      keyword: keyword,
      page: page,
      size: pageSize,
      status: 'COMPLETE',
      sort: '',
    })
  }

  return (
    <div className="w-full p-10">
      <div className="mb-20 flex w-full justify-start gap-x-2">
        <SelectPlanner />
        <DatePickerRange
          startDate={initStartDate}
          endDate={initEndDate}
          searchDate={searchDate}
        />
        <CustomerSearch searchKeyword={searchKeyword} />
        <form className="flex" onSubmit={handleSubmit}>
          <button className="w-10 bg-sky-500">
            <SearchIcon className="text-white" />
          </button>
        </form>
      </div>
      <div className="h-content flex w-full">
        <Lists params={params} />
      </div>
    </div>
  )
}

export default PublishList
