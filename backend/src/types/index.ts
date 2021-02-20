import { JwtHeader } from 'jsonwebtoken'

export interface error {
    message: string
    code?: number
}

export interface JwtPayload {
  iss: string
  sub: string
  iat: number
  exp: number
}

export interface Contact {
  id: string,
  userId: string,
  name: string,
  email: string,
  title: string,
  monthOfBirth: number,
  dayOfBirth: number,
  createdAt: string,
  phoneNumber: string,
  dateOfBirth: string,
  [key: string]: any
}

export interface ContactUpdate {
  name?: string,
  email?: string,
  title?: string,
  monthOfBirth?: number,
  dayOfBirth?: number,
  phoneNumber?: string,
  dateOfBirth?: string
}

export interface ContactRequest {
    name: string,
    email: string,
    title: string,
    monthOfBirth: number,
    dayOfBirth: number,
    dateOfBirth: string,
    phoneNumber: string
}

export interface ContactUpdateRequest {
  name?: string,
  email?: string,
  title?: string,
  monthOfBirth?: number,
  dayOfBirth?: number,
  dateOfBirth?: string,
  phoneNumber?: string
}

export interface User {
  id: string,
  messages?: []
}

export interface UserUpdate {
  messages?: []
  cardUrl?: string
}

export interface JwtPayload {
  iss: string
  sub: string
  iat: number
  exp: number
}

export interface Jwt {
  header: JwtHeader
  payload: JwtPayload
}
