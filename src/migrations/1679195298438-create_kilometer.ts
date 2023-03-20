import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createKilometer1679195298438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'kilometer',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'moment',
            type: 'enum',
            enum: ['inicio', 'fim'],
          },
          {
            name: 'amount',
            type: 'integer',
          },
          {
            name: 'kilometer_date',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('kilometer')
  }
}
