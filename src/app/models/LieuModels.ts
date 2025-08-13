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
  images: LieuDetailsImages[]
  services: Service[]
  reservations: Reservation[]
}

export interface Service {
  id: number
  name: string
}

export interface LieuDetailsImages {
  id: number
  imageUrl: string
}

export interface ImageDialogData {
  images: LieuDetailsImages[]
  index: number
  url: string
}

export interface AddLieuRequest {
  name: string
  address: string
  city: string
  postal_code: string
  description: string
  price: number
  favorite_picture: string
}

export interface getImagesOfLieuResponse {
  id: number
  imageUrl: string
  lieuId: number
}
