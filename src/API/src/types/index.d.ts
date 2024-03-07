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
}

export interface IDestination {
  name: string
  description: string
  latitude: number
  longitude: number
  type: string
  vote: number
}

export interface IUserLove {
  userId: string
  destId: string
}

export interface IUserComment {
  userId: string
  destinationId: string
  content: string
}

export interface IUserHobby {}

export interface IDestinationImage {}

export interface IDestinationType {}
