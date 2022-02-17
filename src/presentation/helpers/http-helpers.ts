import { ServerError } from '../errors/server-error'

export const badRequest = (error: Error): any => ({
  statusCode: 400,
  body: error
})

export const serverError = (): any => ({
  statusCode: 500,
  body: new ServerError()
})
