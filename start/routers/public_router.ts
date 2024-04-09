const CardsController = () => import('#controllers/cards_controller')
import router from '@adonisjs/core/services/router'

export default function authRouter() {
  router.get('cards', [CardsController, 'getAllCards'])
}
