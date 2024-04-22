import Card from '#models/card'
import { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  async getAllCards() {
    return await Card.all()
  }
  async getOneCard({ request }: HttpContext) {
    const card = await Card.findByOrFail('id', request.param('id'))
    return card
  }
}
