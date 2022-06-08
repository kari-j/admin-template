import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { DataGrid, GridColumns, GridSortModel } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'

interface IPageInfo {
  data: any
  rows: object[]
  columns: GridColumns<object>
  total: number
  pageTotal: number
  rowClicks: boolean
  loading: boolean
}

// paging 및 sort를 위한 recoil state
export const gridPageState = atom<number>({
  key: 'gridPageState',
  default: 1,
})
export const gridPageSizeState = atom<number>({
  key: 'gridPageSizeState',
  default: 10,
})
export const gridSortState = atom<string>({
  key: 'gridSortState',
  default: '',
})
export const gridSortModelState = atom<GridSortModel>({
  key: 'gridSortModelState',
  default: [],
})

export const DataGridBasic = (params: IPageInfo) => {
  const router = useRouter()

  const [page, setPage] = useRecoilState(gridPageState)
  const [pageSize, setPageSize] = useRecoilState(gridPageSizeState)
  const [sort, setSort] = useRecoilState(gridSortState)
  const [sortModel, setSortModel] = useRecoilState(gridSortModelState)

  const columnData = useMemo(() => params.columns, [params.columns])
  const rowData = useMemo(() => params.rows, [params.rows])
  const [rowCountState, setRowCountState] = useState(params.total || 0)
  useEffect(() => {
    setRowCountState((prevRowCountState: number) =>
      params.total !== undefined ? params.total : prevRowCountState
    )
  }, [params.total, setRowCountState])

  const handleOnRowClick = (id: number) => {
    if (!params.rowClicks) return false
    router.push(`/publish/list/${id}`)
  }

  const handleSortData = (model: GridSortModel) => {
    const set = model[0] ? `${model[0].field}#${model[0].sort}` : ''
    setSort(set)
    setSortModel(model)
  }
  const resetpage = useResetRecoilState(gridPageState)
  const resetSort = useResetRecoilState(gridSortState)
  const resetSortModel = useResetRecoilState(gridSortModelState)
  const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    resetpage()
    resetSort()
    resetSortModel()
    setPageSize(parseInt(e.target.value))
  }

  const CustomPagination = () => {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="item-center mr-10 justify-center border">
          <select
            onChange={handlePageSize}
            value={pageSize}
            className="w-30 h-7"
          >
            <option value="10">10 /page</option>
            <option value="50">50 /page</option>
            <option value="100">100 /page</option>
          </select>
        </div>

        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page}
          count={params.pageTotal || 0}
          // @ts-expect-error
          renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            setPage(value)
          }
        />
      </div>
    )
  }
  return (
    <div className="flex h-full">
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={rowData}
          columns={columnData}
          pageSize={pageSize}
          rowCount={rowCountState}
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage + 1)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          components={{
            Pagination: CustomPagination,
          }}
          onRowClick={(param) => handleOnRowClick(param.row.id)}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={handleSortData}
          loading={params.loading}
          autoHeight
          disableColumnMenu
          hideFooterSelectedRowCount
        ></DataGrid>
      </div>
    </div>
  )
}
