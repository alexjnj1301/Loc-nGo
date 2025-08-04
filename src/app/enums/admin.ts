export enum ReservationsActions {
  CONFIRMED = 'myReservations.dialog.actions.confirm',
  CANCELED = 'myReservations.dialog.actions.cancel',
  CANCEL = 'myReservations.dialog.actions.close'
}

export interface UpdateBookRequest {
  id: number
  status: string
}
