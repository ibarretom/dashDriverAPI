import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('earning')
export class Earning {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  user_id: string

  @Column({ type: 'float' })
  amount: number

  @Column({ type: 'timestamp' })
  earning_date: string | Date

  @Column({ type: 'timestamp', default: 'now()' })
  created_at: string | Date
}
