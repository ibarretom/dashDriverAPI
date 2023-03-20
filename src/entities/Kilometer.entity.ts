import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('kilometer')
export class Kilometer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  user_id: string

  @Column({ type: 'enum', enum: ['inicio', 'fim'] })
  moment: string

  @Column({ type: 'integer' })
  amount: number

  @Column({ type: 'timestamp' })
  kilometer_date: string | Date

  @Column({ type: 'timestamp', default: 'now()' })
  created_at: string | Date
}
