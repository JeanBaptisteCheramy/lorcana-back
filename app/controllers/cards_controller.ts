import Card from '#models/card'

export default class CardsController {
  async getAllCards() {
    const cards = await Card.all()
    return cards
  }
}
