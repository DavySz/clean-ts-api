import { InvalidParamError } from './../errors/invalid-param-error'
import { badRequest, serverError } from '../helpers/http-helpers'
import { MissingParamError } from '../errors/missing-param-error'
import { EmailValidator } from './../protocols/email-validator'
import { Controller } from './../protocols/contoller'
import { htppRequest } from '../protocols/http'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: htppRequest): any {
    try {
      const requiredFilds = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFilds) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
