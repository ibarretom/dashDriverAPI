import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/typeorm'

import { Address } from '../../entities/Address.entity'

import { IAddressDto } from '../../dto/IAddress.dto'
import { IAddressRepository } from './IAddress.repository'

export class AddressRepository implements IAddressRepository {
  private repository: Repository<Address>

  constructor() {
    this.repository = AppDataSource.getRepository(Address)
  }

  async create(address: IAddressDto): Promise<Address> {
    const createdAddress = this.repository.create(address)

    return await this.repository.save(createdAddress)
  }

  async findByZipCode(zip_code: number): Promise<Address | null> {
    const address = await this.repository.findOne({ where: { zip_code } })

    return address
  }
}
