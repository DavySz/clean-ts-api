import { Controller, htppRequest, EmailValidator, Authentication } from './login-protocols'
import { badRequest, serverError, unauthorized } from './../../helpers/http-helpers'
import { MissingParamError, InvalidParamError } from '../../errors'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication
  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: htppRequest): Promise<any> {
    try {
      const { email, password } = httpRequest.body
      const requiredFilds = ['email', 'password']
      for (const field of requiredFilds) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid('any_mail@mail.com')
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
