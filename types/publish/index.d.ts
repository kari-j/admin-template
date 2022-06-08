declare namespace IPublishs {
  namespace Publishs {
    interface Input {
      keyword?: string // 검색어
      startDate: string // 검색시작일
      endDate: string // 검색종료일
      page?: number // 현재페이지
      size?: number // 검색 row 수
      status?: EnumPublishStatusType // 상담 상태
      sort?: string // 정렬 column#ASC/DESC
    }
    interface Output {
      [x: string]: number
      data: Partial<PublishList.Output>[]
      page: number
      size: number
      total: number
      pageTotal: number
    }
  }

  namespace PublishList {
    interface Output {
      id: number
      createdAt: Date
      updatedAt: Date
      deletedAt: Date
      type: string
      platform: string
      isAgain: number
      isManual: number
      isComplete: number
      assignmentAt: Date
      renewaledAt: null
      isReassignment: number
      cdr?: object
      customer: Customer.CustomerType
      planner: Planner
      company: Company
    }
  }

  interface Planner {
    id: number
    nickname: string
    deletedAt: Date
  }

  interface Company {
    id: number
    type: string
    name: string
  }
}
