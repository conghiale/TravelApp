export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  password: string
  role: string
  language: string
  lock: boolean
  avatar: string
  codeValidation: string
}

export interface IDestination {
  id: string
  nameVi: string
  nameEn: string
  descriptionVi: string
  descriptionEn: string
  latitude: number
  longitude: number
  types: string[]
  vote: number
  status: number
  createdBy: string
  role: string
  accepted: boolean
}

export interface IUserLove {
  userId: string
  destId: string
}

export interface IUserComment {
  id: string
  userId: string
  destinationId: string
  content: string
}

export interface IUserHobby {}

export interface IDestinationImage {}

export interface IDestinationType {}
