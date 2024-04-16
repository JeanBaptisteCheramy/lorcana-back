import Deck from '#models/deck'
import { createDeckValidator, updateDeckValidator } from '#validators/validate_deck'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

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
    let res: boolean = false
    let message: string = ''

    try {
      // Récupérer le deck correspondant à l'ID fourni dans la requête
      const deck = await Deck.findByOrFail('id', request.param('id'))

      // Récupérer les cartes déjà présentes dans le deck depuis la base de données
      const deckCards = await db
        .from('card_deck')
        .select('id', 'card_id', 'quantity', 'deck_id')
        .where('deck_id', request.param('id'))

      // Vérifier si l'utilisateur est autorisé à modifier ce deck
      if (auth.user?.id === deck.userId) {
        // Récupérer les données de la requête (nom du deck et les cartes à ajouter)
        const data = request.only(['name', 'cardsToAdd', 'cardsToDelete'])
        const payload = await updateDeckValidator.validate(data)

        // Parcourir les cartes à ajouter au deck
        if (payload.cardsToAdd) {
          for (const cardToAddPayload of payload.cardsToAdd) {
            // Vérifier si la carte est déjà présente dans le deck
            const existingCard = deckCards.find(
              (cardFromDeck) => cardFromDeck.card_id === cardToAddPayload.id
            )
            if (existingCard) {
              // Vérifier si l'ajout de la carte ne dépasse pas la limite de 4 cartes du même type dans le deck
              if (existingCard.quantity + cardToAddPayload.quantity <= 4) {
                existingCard.quantity += cardToAddPayload.quantity
                await db
                  .from('card_deck')
                  .where('id', existingCard.id)
                  .update({ quantity: existingCard.quantity })
                res = true
                message = 'Deck updated successfully'
              } else {
                res = false
                message = 'Maximum 4 of the same card in a deck'
                return response.status(500).send({ message })
              }
            } else {
              // Ajouter la carte au deck
              await db.table('card_deck').insert({
                card_id: cardToAddPayload.id,
                deck_id: deck.id,
                quantity: cardToAddPayload.quantity,
              })
              res = true
              message = 'Deck updated successfully'
            }
          }
        }
        if (payload.cardsToDelete) {
          for (const cardToDeletePayload of payload.cardsToDelete) {
            const existingCard = deckCards.find(
              (cardFromDeck) => cardFromDeck.card_id === cardToDeletePayload.id
            )
            if (existingCard) {
              if (existingCard.quantity - cardToDeletePayload.quantity <= 0) {
                await db.from('card_deck').where('id', existingCard.id).delete()
              } else {
                await db
                  .from('card_deck')
                  .where('id', existingCard.id)
                  .update({ quantity: existingCard.quantity - cardToDeletePayload.quantity })
              }
              res = true
              message = 'Deck updated successfully'
            } else {
              res = false
              message = 'No card to delete'
            }
          }
        }

        // Mettre à jour le nom du deck si nécessaire
        if (deck.name !== payload.name) {
          deck.name = payload.name
          await deck.save()
          res = true
        }

        // Envoyer la réponse en fonction du succès ou de l'échec de la mise à jour du deck
        if (res) {
          return response.status(200).send({ message })
        } else {
          return response.abort({ message })
        }
      } else {
        // L'utilisateur n'est pas autorisé à modifier ce deck
        return response.abort({ message: 'Unauthorized' }, 403)
      }
    } catch (error) {
      // Gérer les erreurs
      console.error(error)
      return response.status(500).send({ message: message })
    }
  }
  // DELETE DECK --------------------------------------------------------------------------------
  async deleteDeck({ auth, request, response }: HttpContext) {
    const deck = await Deck.findByOrFail('id', request.param('id'))

    if (auth.user?.id === deck.userId) {
      await deck.delete()
    }
  }
}
