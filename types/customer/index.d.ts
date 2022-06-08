declare namespace Customer {
  declare interface CustomerType {
    _id: string
    token: string // mongoose 저장 X
    push_id: string
    uuid: string
    name: string
    email: string
    phone: string
    password: string
    twofactory: TwoFactoryType
    birthdate: string
    gender: EnumGender
    job: EnumJobRisk
    agency: EnumAgency
    foreigner: boolean
    safetycall: SafetycallType
    family: FamilyType
    planner: Planner
    isMarketing: boolean
    isPush: boolean
    bodocInsurance?: object
    cooconInsurance?: object
    analysisData?: Engine.Analysis.MappingData.Type // mongoose 저장 X
    isBodoc: boolean // mongoose 저장 X
    isCoocon: boolean // mongoose 저장 X
    lastPasswordChangedAt: Date
    lastLoginedAt: Date
    createdAt: Date
    updatedAt: Date | null
    deletedAt: Date | null
  }
  declare interface TwoFactoryType {
    isBio?: boolean
    code?: string
  }

  declare interface SafetycallType {
    _id: string
    virtualPhone: string
    createdAt: Date
    updatedAt: Date
  }

  declare interface FamilyType {
    _id: string
    father: CustomerType | null
    mother: CustomerType | null
    spouse: CustomerType | null
    brother: CustomerType[]
    children: CustomerType[]
    createdAt: Date
    updatedAt: Date | null
    deletedAt: Date | null
  }
}
