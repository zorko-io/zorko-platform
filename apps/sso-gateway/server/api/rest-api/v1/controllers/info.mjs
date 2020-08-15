import { makeRouterHandler }    from '../../../../utils/useCaseRunner.mjs';
import Show                     from '../../../../use-cases/v1/info/Show.mjs';


export default {
    show: makeRouterHandler(Show, () => ({}))
}
