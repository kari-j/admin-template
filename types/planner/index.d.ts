declare interface PlannerType {
  _id: string
  name: string
  nickname: string
  gender: EnumGender
  email: string
  birthdate: string
  phone: string
  otp: string
  password: string
  limit: number
  warning: number
  company: CompanyType
  plannerManage: PlannerManageType
  isActive: boolean
  lastPasswordChangedAt: Date
  lastLoginedAt: Date
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

interface PlannerManageType {
  _id: string
  otp: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

declare interface CompanyType {
  _id: string
  type: EnumCompany
  company_name: string
  name: string
  email: string
  phone: string
  limit?: number
  api_url?: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}
