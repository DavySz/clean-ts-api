import { Controller, htppRequest, AddAccount, Validation } from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helpers'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: htppRequest): Promise<any> {
    const { name, password, email } = httpRequest.body
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
