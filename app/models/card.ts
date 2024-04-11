import Deck from '#models/deck'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare Artist: string

  @column()
  declare Set_Name: string

  @column()
  declare Set_Num: number

  @column()
  declare Color: number

  @column()
  declare Image: string

  @column()
  declare Cost: number

  @column()
  declare Inkable: boolean

  @column()
  declare Name: string

  @column()
  declare Type: string

  @column()
  declare Rarity: string

  @column()
  declare Flavor_text: string

  @column()
  declare Card_Num: number

  @column()
  declare Body_Text: string

  @column()
  declare Set_ID: string

  @column()
  declare Lore: number

  @column()
  declare Strength: number

  @column()
  declare Classifications: string

  @column()
  declare Willpower: number

  @column()
  declare Move_Cost: number

  @column()
  declare Abilities: string

  @column()
  declare Card_Variants: string

  @manyToMany(() => Deck, {
    localKey: 'id',
    pivotForeignKey: 'card_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'deck_id',
  })
  declare decks: ManyToMany<typeof Deck>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
