import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('address')
@Unique(['zip_code'])
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('integer')
  zip_code: number

  @Column({ type: 'varchar', length: 2 })
  federated_unit: string

  @Column('varchar')
  city: string

  @Column('varchar')
  street: string

  @Column('varchar')
  neighborhood: string

  @Column({ type: 'timestamp', default: 'now()' })
  created_at: string
}
