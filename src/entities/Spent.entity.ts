import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('spent')
export class Spent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  user_id: string

  @Column({
    type: 'enum',
    enum: ['aluguel_de_carro', 'manutencao', 'almoco', 'outros'],
  })
  spent_type: string

  @Column({ type: 'float' })
  amount: number

  @Column({ type: 'timestamp' })
  spent_date: string | Date

  @Column({ type: 'varchar', nullable: true })
  description?: string

  @Column({ type: 'timestamp', default: 'now()' })
  created_at: string | Date
}
