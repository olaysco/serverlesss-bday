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
  dateOfBirth: string
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
  dateOfBirth: string,
  phoneNumber?: string
}

