export type cardType = {
  Artist: string
  Body_Text: string
  Card_Num: number
  Color: string
  Cost: number
  Flavor_Text: string
  Image: string
  Inkable: boolean
  Name: string
  Rarity: string
  Set_ID: string
  Set_Name: string
  Set_Num: number
  Type: string
  lore: number
  strength: number
  classifications: string
  willpower: number
  moveCost: number
  abilities: string
  cardVariants: string | number
  createdAt: string
  updatedAt: string
}
export type DeckType = {
  deck: cardType[]
}
