const CardsController = () => import('#controllers/cards_controller')
const DecksController = () => import('#controllers/decks_controller')
import router from '@adonisjs/core/services/router'

export default function authRouter() {
  router.get('cards', [CardsController, 'getAllCards'])
  router.get('cards/:id', [CardsController, 'getOneCard'])
  router.get('decks', [DecksController, 'getAllDecks'])
  router.get('decks/:id', [DecksController, 'getOneDeck'])
}
