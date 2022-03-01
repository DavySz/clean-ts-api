import { AccountMogoRepository } from './../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from './../../infra/db/mongodb/log-repository/log'
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter'
import { Controller } from './../../presentation/protocols/contoller'
import { LogControllerDecorator } from '../decoretors/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMogoRepository = new AccountMogoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMogoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, makeSignUpValidation())
  const logoMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logoMongoRepository)
}
