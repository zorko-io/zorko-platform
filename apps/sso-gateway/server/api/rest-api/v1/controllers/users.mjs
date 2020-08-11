import { makeRouterHandler }    from '../../../../utils/useCaseRunner.mjs';
import Show                     from '../../../../use-cases/v1/users/Show.mjs';
import Create                   from '../../../../use-cases/v1/users/Create.mjs';
import Remove                   from '../../../../use-cases/v1/users/Remove.mjs';


export default {
    show: makeRouterHandler(Show, req => ({ id: req.params.id })),
    remove: makeRouterHandler(Remove, req => ({ id: req.params.id })),
    save: makeRouterHandler(Create, req => ({ ...req.body })),
    showAll: makeRouterHandler(Show, () => ({}))
}