export type User = {
  id: number,
  email: string,
  password?: string,
}

export type Event = {
  id: number,
  title?: string,
  description?: string,
  // should probably be more datelike than just a string
  startDate: string,
  endDate: string,
  editToken: string,
  // necessary??
  userId: number,
}
