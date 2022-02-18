import { ServerError } from '../errors'

export const badRequest = (error: Error): any => ({
  statusCode: 400,
  body: error
})

export const serverError = (): any => ({
  statusCode: 500,
  body: new ServerError()
})

export const ok = (data: any): any => ({
  statusCode: 200,
  body: data
})
