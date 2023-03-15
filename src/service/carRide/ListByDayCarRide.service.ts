import { ICarRideRepository } from '../../repositories/carRide/ICarRideRepository'
type Request = {
  date: string
  user_id: string
}

export class ListByDayCarRideService {
  constructor(private carRideRepository: ICarRideRepository) {}

  async execute({ date, user_id }: Request) {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    const rides = await this.carRideRepository.findByDay(
      { day, month, year },
      user_id
    )

    return rides
  }
}
