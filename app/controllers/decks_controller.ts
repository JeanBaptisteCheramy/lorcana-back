import Deck from '#models/deck'
import { createDeckValidator } from '#validators/validate_deck'
import { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  async createDeck({ auth, request, response }: HttpContext) {
    if (auth.isAuthenticated) {
      const data = request.only(['name'])
      const payload = await createDeckValidator.validate({ ...data, userId: auth.user.id })
      const deck = await Deck.create(payload)
      response.status(200).json({
        message: 'Deck created sucessfully',
        deck: deck.name,
        user: deck.userId,
      })
    }
  }
  async updateDeck({ auth, request, response }: HttpContext) {
    if (auth.isAuthenticated) {
      const id = request.param('id')
      const deck = await Deck.findBy('id', id)
      const data = request.only(['name', 'cards'])
      const 
    }
  }
}
