import { makeRouterHandler }    from '../../../../utils/useCaseRunner.mjs';
import Create                   from '../../../../use-cases/v1/session/Create.mjs';


export default {
    create: makeRouterHandler(Create, req => ({ ...req.body })),
}