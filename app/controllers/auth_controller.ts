import Collection from '#models/collection'
import User from '#models/user'
import { createUserValidator } from '#validators/validate_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await createUserValidator.validate(data)
      const user = await User.create(payload)
      const userCollection = await Collection.create({ userId: user.id })
      response.status(200).json({ user: user, collection: userCollection })
    } catch (error) {
      console.log(error)

      response.status(500).json({
        message: error.code,
      })
    }
  }

  async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    response.json({
      message: `Logged in as ${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })
  }
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.json('Logout successfull.')
  }
}
