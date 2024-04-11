import Card from '#models/card'
import Deck from '#models/deck'
import { createDeckValidator, updateDeckValidator } from '#validators/validate_deck'
import { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  // CREATE DECK --------------------------------------------------------------------------------

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
  // UPDATE DECK --------------------------------------------------------------------------------

  async updateDeck({ auth, request, response }: HttpContext) {
    const deck = await Deck.findByOrFail('id', request.param('id'))

    if (auth.user?.id === deck.userId) {
      const data = request.only(['name', 'cardsId'])
      const payload = await updateDeckValidator.validate(data)
      const card = await Card.findByOrFail('id', payload.cardsId)
      console.log(card)

      await deck.related('cards').attach([card.id])

      if (deck.name !== payload.name) {
        deck.name = payload.name
      }

      // await deck.save()
      response.status(200).json({
        message: 'Deck updated sucessfully',
        deck: deck.name,
      })
    } else {
      response.abort({ message: 'Unauthorized' }, 403)
    }
  }
  // DELETE DECK --------------------------------------------------------------------------------
  async deleteDeck({ auth, request, response }: HttpContext) {
    if (auth.isAuthenticated) {
      const deck = await Deck.findByOrFail(request.param('id'))
      await deck.delete()
    }
  }
}
