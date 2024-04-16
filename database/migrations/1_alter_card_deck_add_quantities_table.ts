import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'card_deck'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('quantity')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('quantity')
    })
  }
}
