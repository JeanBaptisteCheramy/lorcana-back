import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8).confirmed(),
    lastName: vine.string().trim().minLength(2).maxLength(100),
    firstName: vine.string().trim().minLength(2).maxLength(100),
  })
)
