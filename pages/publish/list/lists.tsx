import { useRecoilValueLoadable } from 'recoil'
import { publishListState } from '../../stores/publish/publish'
import { columns } from '../../../types/publish/datagrid'
import { DataGridBasic } from '../../components/DataGrid'
import { useState, useCallback, useEffect } from 'react'

interface IParams {
  params: IPublishs.Publishs.Input
}
export const Lists = ({ params }: IParams) => {
  console.log('params', params)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Array<object>>([])
  const listData = useRecoilValueLoadable(publishListState(params))

  const requestLists = useCallback((): void => {
    switch (listData.state) {
      case 'hasValue':
        const data = listData.contents?.data ?? []
        setRows(data)
        setIsLoading(false)
        break
      case 'loading':
        setIsLoading(true)
        break
      case 'hasError':
        throw listData.contents
    }
  }, [listData])

  useEffect(() => {
    requestLists()
  }, [requestLists])

  return (
    <div className="w-full" style={{ height: 500 }}>
      {listData.contents.length < 1 ? (
        <div>데이터가 없습니다</div>
      ) : (
        <DataGridBasic
          data={listData.contents}
          rows={rows}
          columns={columns}
          total={listData.contents.total}
          pageTotal={listData.contents.pageTotal}
          rowClicks={true}
          loading={isLoading}
        />
      )}
    </div>
  )
}
