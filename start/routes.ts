/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import authRouter from './routers/auth_router.ts'
import publicRouter from './routers/public_router.ts'
import userRouter from './routers/user_router.ts'

router
  .group(() => {
    router.group(authRouter).prefix('auth')
    router.group(publicRouter).prefix('public')
    router.group(userRouter).prefix('user')
  })
  .prefix('api')
