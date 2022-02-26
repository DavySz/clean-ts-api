import { Controller } from './../../presentation/protocols/contoller'
import { htppRequest } from './../../presentation/protocols/http'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: htppRequest): Promise<any> {
    await this.controller.handle(httpRequest)
    return null
  }
}
