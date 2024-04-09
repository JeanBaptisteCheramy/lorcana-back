import vine from '@vinejs/vine'

export const createDeckValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(100),
    userId: vine.number().positive().withoutDecimals(),
  })
)
export const updateDeckValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(100),
    cards: vine.array(vine.number().withoutDecimals().positive()),
  })
)
