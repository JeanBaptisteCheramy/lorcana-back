import { BaseSchema } from '@adonisjs/lucid/schema'
import roles from '../../app/enums/Roles.ts'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('role_id').unsigned().references('roles.id').defaultTo(roles.USER)
      table.string('last_name').notNullable()
      table.string('first_name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('avatar_url').nullable()
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
