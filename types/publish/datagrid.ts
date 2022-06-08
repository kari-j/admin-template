import { GridColumns, GridValueGetterParams } from '@mui/x-data-grid'
import moment from 'moment'
import * as common from '../../pages/utils/common'
// x-data-grid 컬럼 정의

export const columns: GridColumns<object> = [
  {
    field: 'id',
    headerName: 'ID',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    width: 100,
  },
  {
    field: 'customer.name',
    headerName: '고객명',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => {
      return params.row?.customer?.name
    },
    align: 'center',
    width: 150,
  },
  {
    field: 'safetycall',
    headerName: '안심번호',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => {
      const virtualPhone = params.row?.customer?.safetycall?.virtualPhone
      return virtualPhone
        ? virtualPhone.replace(
            /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
            '$1-$2-$3'
          )
        : '-'
    },
    align: 'center',
    sortable: false,
    width: 250,
  },
  {
    field: 'birthdate',
    headerName: '생년월일(보험나이)',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => {
      // 보험나이 계산
      const birthDate: string = params.row?.customer?.birthdate
      const insuAge: string = birthDate
        ? String(common.insuAge(parseInt(birthDate)))
        : ''
      return `${moment(`${birthDate}`).format('YYYY-MM-DD')} (${insuAge})`
    },
    align: 'center',
    sortable: false,
    width: 150,
  },
  {
    field: 'gender',
    headerName: '성별',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => {
      return params.row?.customer?.gender === 'M'
        ? '남자'
        : params.row?.customer?.gender === 'F'
        ? '여자'
        : '-'
    },
    align: 'center',
    sortable: false,
    width: 100,
  },
  {
    field: 'job',
    headerName: '직업급수',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => {
      return params.row?.customer?.job
    },
    align: 'center',
    sortable: false,
    width: 100,
  },
  {
    field: 'createdAt',
    headerName: '신청일시',
    headerAlign: 'center',
    align: 'center',
    width: 200,
  },

  {
    field: 'updatedAt',
    headerName: '만료일시',
    headerAlign: 'center',
    align: 'center',
    width: 200,
  },
  {
    field: 'realTime',
    headerName: '통화시간(s)',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => {
      return params.row?.cdr?.realTime
    },
    align: 'center',
    sortable: false,
    width: 100,
  },
]
