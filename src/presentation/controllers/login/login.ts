import { MissingParamError } from './../../errors/missing-param-error'
import { badRequest } from './../../helpers/http-helpers'
import { Controller } from './../../protocols/contoller'
import { htppRequest } from './../../protocols/http'

export class LoginController implements Controller {
  async handle (httpRequest: htppRequest): Promise<any> {
    if (!httpRequest.body.email) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!httpRequest.body.password) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
  }
}
