export interface User {
  id: number
  username: string
  image: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  age?: number
  address?: {
    address: string
    city: string
    state: string
  }
  company?: {
    name: string
    title: string
  }
}
