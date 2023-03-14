import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('car_ride')
export class CarRide {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  user_id: string

  @Column({ type: 'float' })
  amount: number

  @Column({ type: 'timestamp' })
  car_ride_date: string

  @Column({ type: 'uuid' })
  address_id: string

  @Column({ type: 'timestamp', default: 'now()' })
  created_at: string
}
