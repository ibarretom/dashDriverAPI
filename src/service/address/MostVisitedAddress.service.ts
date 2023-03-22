import { CarRide } from '../../entities/CarRide.entity'
import { ICarRideRepository } from '../../repositories/carRide/ICarRideRepository'

type MostVisitedAddress = {
  all_time: VisitedObject[]
  dawn: VisitedObject[]
  morning: VisitedObject[]
  afternoon: VisitedObject[]
  night: VisitedObject[]
}

type VisitedObject = {
  id: string
  value: number
}

export class MostVisitedAddressService {
  constructor(private carRideRepository: ICarRideRepository) {}

  async execute(): Promise<MostVisitedAddress> {
    const classified_car_rides = {
      morning: [] as CarRide[],
      afternoon: [] as CarRide[],
      night: [] as CarRide[],
      dawn: [] as CarRide[],
    }

    const car_rides = await this.carRideRepository.findAll()

    let most_visited = this.calculateMostVisitedPlaces(car_rides)
    most_visited = this.getFiveMostVisited(most_visited)

    car_rides.forEach((cr) => {
      if (
        new Date(cr.car_ride_date).getHours() >= 0 &&
        new Date(cr.car_ride_date).getHours() < 6
      ) {
        classified_car_rides.dawn.push(cr)
      } else if (
        new Date(cr.car_ride_date).getHours() >= 6 &&
        new Date(cr.car_ride_date).getHours() < 12
      ) {
        classified_car_rides.morning.push(cr)
      } else if (
        new Date(cr.car_ride_date).getHours() >= 12 &&
        new Date(cr.car_ride_date).getHours() < 18
      ) {
        classified_car_rides.afternoon.push(cr)
      } else if (new Date(cr.car_ride_date).getHours() >= 18) {
        classified_car_rides.night.push(cr)
      }
    })

    let most_visited_dawn = this.calculateMostVisitedPlaces(
      classified_car_rides.dawn
    )
    most_visited_dawn = this.getFiveMostVisited(most_visited_dawn)

    let most_visited_morning = this.calculateMostVisitedPlaces(
      classified_car_rides.morning
    )
    most_visited_morning = this.getFiveMostVisited(most_visited_morning)

    let most_visited_afternoon = this.calculateMostVisitedPlaces(
      classified_car_rides.afternoon
    )
    most_visited_afternoon = this.getFiveMostVisited(most_visited_afternoon)

    let most_visited_night = this.calculateMostVisitedPlaces(
      classified_car_rides.night
    )
    most_visited_night = this.getFiveMostVisited(most_visited_night)

    return {
      all_time: most_visited,
      dawn: most_visited_dawn,
      morning: most_visited_morning,
      afternoon: most_visited_afternoon,
      night: most_visited_night,
    }
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
