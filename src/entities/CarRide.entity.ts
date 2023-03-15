import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Address } from './Address.entity'

@Entity('car_ride')
export class CarRide {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', select: false })
  user_id: string

  @Column({ type: 'float' })
  amount: number

  @Column({ type: 'timestamp' })
  car_ride_date: string | Date

  @Column({ type: 'uuid', select: false })
  address_id: string

  @Column({ type: 'timestamp', default: 'now()' })
  created_at: string

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address
}
