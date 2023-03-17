import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createFuelSpent1679010899517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fuel',
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
            name: 'type',
            type: 'enum',
            enum: ['gasolina', 'etanol', 'gas_natural'],
          },
          {
            name: 'liters',
            type: 'float',
          },
          {
            name: 'amount',
            type: 'float',
          },
          {
            name: 'fuel_date',
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
    await queryRunner.dropTable('fuel')
  }
}
