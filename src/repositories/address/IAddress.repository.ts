import { IAddressDto } from '../../dto/IAddress.dto'
import { Address } from '../../entities/Address.entity'

export interface IAddressRepository {
  create(address: IAddressDto): Promise<Address>
  findByZipCode(zip_code: number): Promise<Address | null>
}
