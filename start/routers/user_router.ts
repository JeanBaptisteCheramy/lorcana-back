const DecksController = () => import('#controllers/decks_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export default function userRouter() {
  router
    .group(() => {
      router.post('create-deck', [DecksController, 'createDeck'])
      router.put('update-deck/:id', [DecksController, 'updateDeck'])
      router.delete('delete-deck/:id', [DecksController, 'deleteDeck'])
    })
    .use(middleware.auth())
}
