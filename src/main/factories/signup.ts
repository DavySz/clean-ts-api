import { AccountMogoRepository } from './../../infra/db/mongodb/account-repository/account'
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMogoRepository = new AccountMogoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMogoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
