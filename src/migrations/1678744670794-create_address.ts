import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createAddress1678744670794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'zip_code',
            type: 'integer',
            isUnique: true,
          },
          {
            name: 'federated_unit',
            type: 'varchar',
            length: '2',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'street',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'create_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address')
  }
}
