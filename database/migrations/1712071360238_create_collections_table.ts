import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collections'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.json('cards').defaultTo({})
      table.integer('user_id').unsigned().references('users.id').notNullable().onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
