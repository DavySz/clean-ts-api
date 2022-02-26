import { EmailValidator, Controller, htppRequest, AddAccount } from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError } from '../../errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: htppRequest): Promise<any> {
    const { name, password, passwordConfirmation, email } = httpRequest.body
    try {
      const requiredFilds = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFilds) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
