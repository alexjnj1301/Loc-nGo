export interface BookRequest {
  lieu: {
    id: number
  }
  start_date: string
  end_date: string
  attendees: Attendee[]
}

export interface BookResponse {
  id: number
  nom: string
  prenom: string
  email: string
  nbPersonnes: number
  telephone: string
  prix: number
  dateDebut: string
  dateFin: string
  status: string
  attendees: Attendee[]
}

export interface Attendee {
  firstname: string
  name: string
}
