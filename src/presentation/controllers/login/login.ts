import { Authentication } from './../../../domain/usecases/authentication'
import { InvalidParamError } from './../../errors/invalid-param-error'
import { MissingParamError } from './../../errors/missing-param-error'
import { badRequest, serverError } from './../../helpers/http-helpers'
import { EmailValidator } from '../signup/signup-protocols'
import { Controller } from './../../protocols/contoller'
import { htppRequest } from './../../protocols/http'

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
      if (!email) {
        return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }
      if (!password) {
        return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }
      const isValid = this.emailValidator.isValid('any_mail@mail.com')
      if (!isValid) {
        return await new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }
      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
