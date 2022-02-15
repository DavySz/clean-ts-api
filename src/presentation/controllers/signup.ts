import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from './../protocols/contoller'
import { badRequest } from '../helpers/http-helpers'
import { htppRequest } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: htppRequest): any {
    const requiredFilds = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFilds) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
