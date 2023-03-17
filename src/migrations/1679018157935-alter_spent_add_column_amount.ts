import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class alterSpentAddColumnAmount1679018157935
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'spent',
      new TableColumn({
        name: 'amount',
        type: 'float',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('spent', 'amount')
  }
}
