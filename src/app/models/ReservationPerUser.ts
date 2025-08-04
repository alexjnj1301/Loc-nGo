export interface Reservation {
  id: number
  lieu: Lieu
  start_date: string
  end_date: string
  nb_person: number
  reference: string
  attendees: Attendee[]
  status: string
}

export interface Lieu {
  id: number
  name: string
  address: string
  city: string
  postal_code: string
  price: number
}

export interface Attendee {
  attendeeId: number
  name: string | null
  firstname: string | null
}

export interface AllReservationsByUserId {
  id: number
  lieuImages: string
  start_date: string
  end_date: string
  reference: string
  lieu: Lieu
  status: string
}
