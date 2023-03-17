import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('fuel')
export class Fuel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  user_id: string

  @Column({ type: 'enum', enum: ['gasolina', 'etanol', 'gas_natural'] })
  type: string

  @Column({ type: 'float' })
  liters: number

  @Column({ type: 'float' })
  amount: number

  @Column({ type: 'timestamp' })
  fuel_date: string | Date

  @Column({ type: 'timestamp', default: 'now()' })
  created_at: string | Date
}
