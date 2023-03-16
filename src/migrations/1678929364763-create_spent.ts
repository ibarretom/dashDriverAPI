import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createSpent1678929364763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'spent',
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
            name: 'spent_type',
            type: 'enum',
            enum: ['aluguel_de_carro', 'manutencao', 'almoco', 'outros'],
          },
          {
            name: 'spent_date',
            type: 'timestamp',
          },
          {
            name: 'amount',
            type: 'float',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        // foreignKeys: [
        //   {
        //     name: 'FKUserID',
        //     referencedTableName: 'users',
        //     referencedColumnNames: ['id'],
        //     columnNames: ['user_id'],
        //     onDelete: 'SET NULL',
        //     onUpdate: 'SET NULL',
        //   },
        // ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('spent')
  }
}
