import { CarRide } from '../../entities/CarRide.entity'

import { ICarRideRepository } from '../../repositories/carRide/ICarRideRepository'

type VisitedObject = {
  id: string
  value: number
}

export class MostVisitedByMonthAddressService {
  constructor(private carRideRepository: ICarRideRepository) {}

  async execute(date: string): Promise<VisitedObject[]> {
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    const car_rides = await this.carRideRepository.findAllByMonth({
      month,
      year,
    })

    let most_visited = this.calculateMostVisitedPlaces(car_rides)

    most_visited = this.getFiveMostVisited(most_visited)

    return most_visited
  }

  private calculateMostVisitedPlaces(car_rides: CarRide[]) {
    const commonPlaces: any = {}

    car_rides.forEach((car_ride) => {
      if (
        !commonPlaces[
          `${car_ride.address.neighborhood} - ${car_ride.address.city}`
        ]
      ) {
        commonPlaces[
          `${car_ride.address.neighborhood} - ${car_ride.address.city}`
        ] = 1
      } else {
        commonPlaces[
          `${car_ride.address.neighborhood} - ${car_ride.address.city}`
        ] += 1
      }
    })

    return this.objectToArray(commonPlaces)
  }

  private getFiveMostVisited(places: VisitedObject[]): VisitedObject[] {
    const five_or_less_places = []

    const sorted_most_visited_places = places.sort((a, b) => {
      if (a.value > b.value) {
        return -1
      }

      if (a.value < b.value) {
        return 1
      }

      return 0
    })

    for (let start = 0; start < 5; start++) {
      if (sorted_most_visited_places[start]) {
        five_or_less_places.push(sorted_most_visited_places[start])
      } else {
        break
      }
    }

    return five_or_less_places
  }

  private objectToArray(obj: any): VisitedObject[] {
    const array = []

    for (const key of Object.keys(obj)) {
      array.push({ id: key, value: obj[key] })
    }

    return array
  }
}
