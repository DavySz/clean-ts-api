import { AccountMogoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '../../decoretors/log-controller-decorator'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { Controller } from '../../../presentation/protocols/contoller'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMogoRepository = new AccountMogoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMogoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logoMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logoMongoRepository)
}
