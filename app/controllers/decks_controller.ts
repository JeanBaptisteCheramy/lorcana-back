import Deck from '#models/deck'
import { createDeckValidator, updateDeckValidator } from '#validators/validate_deck'
import { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  async createDeck({ auth, request, response }: HttpContext) {
    if (auth.isAuthenticated && auth.user) {
      const data = request.only(['name'])
      const payload = await createDeckValidator.validate({ ...data, userId: auth.user.id })
      const deck = await Deck.create(payload)
      response.status(200).json({
        message: 'Deck created sucessfully',
        deckName: deck.name,
        deckId: deck.id,
        user: deck.userId,
      })
    }
  }
  async updateDeck({ auth, request, response }: HttpContext) {
    if (auth.isAuthenticated) {
      const id: number = request.param('id')
      const deck = await Deck.findByOrFail('id', id)
      const data = request.only(['name', 'cards'])
      const payload = await updateDeckValidator.validate(data)
      if (deck.name !== payload.name) {
        deck.name = payload.name
      }
      payload.cards.forEach((item) => {
        deck.cards.cards.push(item)
      })
      await deck.save()
      response.status(200).json({
        message: 'Deck updated sucessfully',
        deck: deck.name,
        cards: deck.cards,
      })
    }
  }
  async deleteDeck({ auth, request, response }: HttpContext) {
    if (auth.isAuthenticated) {
      const deck = await Deck.findByOrFail(request.param('id'))
      await deck.delete()
    }
  }
}
