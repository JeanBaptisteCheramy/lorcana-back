import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('artist')
      table.string('set_name')
      table.integer('set_num')
      table.string('color')
      table.string('image')
      table.integer('cost')
      table.boolean('inkable')
      table.string('name')
      table.string('type')
      table.string('rarity')
      table.string('flavor_text', 600)
      table.integer('card_num')
      table.string('body_text', 600)
      table.string('set_id')
      table.integer('lore')
      table.integer('strength')
      table.string('classifications')
      table.integer('willpower')
      table.integer('move_cost')
      table.text('abilities')
      table.text('card_variants')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
