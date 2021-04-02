import {AccessContentFacade} from '../core/AccessContentFacade.mjs'

export class MongoAccessContentFacade extends AccessContentFacade {


  constructor(context = {}, deps) {
    super()

  }

  get register() {
    return super.register;
  }

  get content() {
    return super.content;
  }

  get repository() {
    return super.repository;
  }
}