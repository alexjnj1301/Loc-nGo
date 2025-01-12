import { Reservation } from './ReservationPerUser'

export interface AllLieuResponse {
  id: number
  name: string
  address: string
  city: string
  postal_code: string
  favorite_picture: string
}

export interface LieuDetailsResponse {
  id: number
  name: string
  address: string
  city: string
  postal_code: string
  favorite_picture: string
  description: string
  price: number
  images: [{
    id: number
    imageUrl: string
  }]
  services: string[]
  reservations: Reservation[]
}
