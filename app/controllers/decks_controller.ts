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
      const data = request.only(['name', 'cards', 'cardsToDelete'])
      const payload = await updateDeckValidator.validate(data)
      if (deck.name !== payload.name) {
        deck.name = payload.name
      }
      // if (payload.cards && payload.cards !== null)
      //   payload.cards.forEach((item) => {
      //     deck.cards.cards.push(item)
      //   })
      // deck.cards.cards.sort((a: number, b: number) => a - b)
      // if (payload.cardsToDelete && payload.cardsToDelete !== null) {
      //   payload.cardsToDelete.forEach((card) => {
      //     const comparison = (item: number) => item === card
      //     const index = deck.cards.cards.findIndex(comparison)
      //     deck.cards.cards.splice(index, 1)
      //   })
      // }

      // await deck.save()
      response.status(200).json({
        message: 'Deck updated sucessfully',
        deck: deck.name,
        cards: deck.cards,
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
