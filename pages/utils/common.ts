import moment from 'moment'

export const getAge = (yyyymmdd: number): number => {
  let age: number // 만나이

  const dateformat = moment(yyyymmdd, 'YYYYMMDD')
  const yyyy = dateformat.get('year')
  const mm = dateformat.get('month') + 1
  const dd = dateformat.get('date')

  // const yyyy: number = parseInt(String(yyyymmdd).substring(0, 4), 10)
  const mmdd: number = parseInt(`${mm}${dd}`)

  let tmm = moment().get('month') + 1
  let tdd = moment().get('date')

  const date = tmm < 10 ? `0${tdd}` : `${tdd}`
  const today: number = parseInt(`${tdd}${date}`)
  age = moment().get('year') - yyyy + 1

  //생일이 지났는지 체크하여 만나이계산
  if (today < mmdd) {
    age = age - 2
  } else {
    age = age - 1
  }

  return age
}

//보험나이 계산
export const insuAge = (yyyymmdd: number): number => {
  const age: number = getAge(yyyymmdd)
  let insuAge: number = age

  const d = moment()
  const mm = d.get('month') + 1
  const tmm = moment(yyyymmdd, 'YYYYMMDD').get('month') + 1
  const x = Math.abs(tmm - mm)

  // 6개월 미만 절삭
  if (x > 6) {
    insuAge = age + 1
  }
  return insuAge
}
