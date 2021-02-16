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
  monthOfbirth: number,
  dayOfBirth: number,
  createdAt: string,
  phoneNumber: string
}

export interface ContactUpdate {
  name?: string,
  email?: string,
  title?: string,
  monthOfbirth?: number,
  dayOfBirth?: number,
  phoneNumber?: string
}

export interface ContactRequest {
    name: string,
    email: string,
    title: string,
    monthOfbirth: number,
    dayOfBirth: number,
    phoneNumber: string
}

export interface ContactUpdateRequest {
  name?: string,
  email?: string,
  title?: string,
  monthOfbirth?: number,
  dayOfBirth?: number,
  phoneNumber?: string
}

