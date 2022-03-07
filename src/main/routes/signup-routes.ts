import { makeSignUpController } from '../factories/signup/signup-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoute(makeSignUpController()))
}
