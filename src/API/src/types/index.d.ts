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
  typesString: string
  theme: string
}

export interface IDestination {
  id: string
  nameVi: string
  nameEn: string
  descriptionVi: string
  descriptionEn: string
  latitude: number
  longitude: number
  typesString: string
  vote: number
  status: number
  createdBy: string
  role?: string
  accepted?: boolean
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
  star: number
}

export interface IUserHobby {}

export interface IDestinationImage {}

export interface IDestinationType {
  id: string
  label: string
}
