import { IAddressDto } from '../../dto/IAddress.dto'
import { Address } from '../../entities/Address.entity'
import { IAddressRepository } from './IAddress.repository'

export class AddressInMemoryRepository implements IAddressRepository {
  private repository: Address[]

  constructor() {
    this.repository = [
      {
        id: 'in-memory',
        zip_code: 24445570,
        federated_unit: 'TD',
        city: 'Test Jest',
        neighborhood: 'Neighborhood',
        street: 'street',
        created_at: new Date().toISOString(),
      },
    ]
  }

  async create(address: IAddressDto): Promise<Address> {
    const created_address = new Address()

    Object.assign(created_address, {
      id: 'created_id',
      zip_code: address.zip_code,
      federated_unit: address.federated_unit,
      city: address.city,
      neighborhood: address.neighborhood,
      street: address.street,
      create_at: new Date().toISOString(),
    })

    return created_address
  }

  async findByZipCode(zip_code: number): Promise<Address | null> {
    const address = this.repository.find((a) => a.zip_code == zip_code)

    return address || null
  }
}
