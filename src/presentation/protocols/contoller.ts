import { htppRequest } from './http'

export interface Controller {
  handle: (httpRequest: htppRequest) => any
}
