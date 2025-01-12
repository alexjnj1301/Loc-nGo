export interface Reservation {
  id: number
  lieu: Lieu
  start_date: string
  end_date: string
  nb_person: number
  reference: string
  attendees: Attendee[]
}

export interface Lieu {
  id: number
  name: string
  address: string
  city: string
  postal_code: string
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
}
