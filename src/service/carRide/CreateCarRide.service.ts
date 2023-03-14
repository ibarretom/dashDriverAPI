import { CarRide } from '../../entities/CarRide.entity'

import { IAddressRepository } from '../../repositories/address/IAddress.repository'
import { ICarRideRepository } from '../../repositories/carRide/ICarRideRepository'

type Request = {
  user_id: string
  address: {
    zip_code: number
    federated_unit: string
    city: string
    street: string
    neighborhood: string
  }
  amount: number
  date: string
}

export class CreateCarRideService {
  constructor(
    private carRideRepository: ICarRideRepository,
    private addressRepository: IAddressRepository
  ) {}

  async execute(carRide: Request): Promise<CarRide> {
    let address = await this.addressRepository.findByZipCode(
      carRide.address.zip_code
    )

    if (!address) {
      address = await this.addressRepository.create(carRide.address)
    }

    const createdCarRide = await this.carRideRepository.create({
      user_id: carRide.user_id,
      address_id: address.id,
      amount: carRide.amount,
      car_ride_date: carRide.date,
    })

    return createdCarRide
  }
}
