import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @PrimaryColumn('varchar')
  email: string

  @Column('varchar')
  password: string

  @Column('varchar', { default: null })
  photo_url: string

  @Column('timestamp', { default: 'now()' })
  created_at: Date

  @Column('timestamp', { default: 'now()', onUpdate: 'now()' })
  updated_at: Date
}
