import React, { ChangeEvent, useState } from 'react'

interface IProps {
  searchKeyword: (keyword: string) => void
}
export const CustomerSearch = ({ searchKeyword }: IProps) => {
  const [keyword, setKeyword] = useState<string>('')
  const keywordSet = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    searchKeyword(e.target.value)
  }
  return (
    <div className="flex w-4/12 border border-gray-300 px-2 py-2">
      <input
        className="w-full"
        id="keyword"
        placeholder="tip) 고객 이름 검색, 검색어 미입력시 고객 전체 검색"
        value={keyword}
        onChange={keywordSet}
      />
    </div>
  )
}
