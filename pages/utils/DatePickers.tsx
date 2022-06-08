import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import { ko } from 'date-fns/esm/locale'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import moment from 'moment'

interface IProps {
  startDate: Date
  endDate: Date
  searchDate: (dataRange: string[]) => void
}

// 화면마다 세팅되는 날짜 범위가 다를 수 있으니 시작/종료일은 부모컴포넌트에서 정의한다.
export const DatePickerRange = ({ startDate, endDate, searchDate }: IProps) => {
  const [calOpen, setCalOpen] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<any>([startDate, endDate])
  // 부모컴포넌트에서 호출
  const setSearchDate = () => {
    //00시~23시까지 세팅
    const date: string[] = [
      moment(dateRange[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      moment(dateRange[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    ]
    searchDate(date)
  }

  // useEffect(() => {
  //   setSearchDate()
  // }, [])

  return (
    <>
      <div
        className="flex w-2/12 border border-gray-300 px-2 py-2"
        onClick={() => setCalOpen(true)}
      >
        <DatePicker
          className="w-full"
          renderCustomHeader={({
            monthDate,
            customHeaderCount,
            decreaseMonth,
            increaseMonth,
          }) => (
            <div>
              <button
                aria-label="Previous Month"
                className={
                  'react-datepicker__navigation react-datepicker__navigation--previous'
                }
                style={customHeaderCount === 1 ? { visibility: 'hidden' } : {}}
                onClick={decreaseMonth}
              >
                <span
                  className={
                    'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                  }
                >
                  {'<'}
                </span>
              </button>
              <span className="react-datepicker__current-month">
                {monthDate.toLocaleString('ko', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <button
                aria-label="Next Month"
                className={
                  'react-datepicker__navigation react-datepicker__navigation--next'
                }
                style={customHeaderCount === 0 ? { visibility: 'hidden' } : {}}
                onClick={increaseMonth}
              >
                <span
                  className={
                    'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                  }
                >
                  {'>'}
                </span>
              </button>
            </div>
          )}
          selectsRange={true}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={(date) => setDateRange(date)}
          monthsShown={2}
          dateFormat="yyyy-MM-dd"
          dateFormatCalendar="yyyy년 MM월"
          shouldCloseOnSelect={true}
          // locale={ko}
          open={calOpen}
          onClickOutside={() => {
            setCalOpen(false)
          }}
          dropdownMode="select"
          onCalendarClose={setSearchDate}
        />
        <CalendarMonthIcon />
      </div>
    </>
  )
}
