# web-portal-client


## Start Project in Dev Mode

`yarn start`


## Design Decisions

We choose to build our client on top of React + [Redux Tooltip](https://redux-toolkit.js.org/) stack

Application consist within  `Features` each feature may has next layers

1. `Slices` -  provides reducer and actions to manipulate within particular feature state slice
2. `Selectors` - provides access to data required by a feature related to it's state slice
3. `Hooks` - contains interactions with side effects and state management
4. `Middlewares` - Redux middleware, main propose is to listen for app action flow and to some additional actions
5. `Components` - 'dummy' components, which has no relations for `Slices` and `Selectors`
6. `Containers` - components used by external features, usually use `Selectors` and Redux Actions

### Features

Parts of application which may contains UI. Feature usually contains store state, actions to work with that store and
already 'connected' UI component to application store.

Each feature may contains its own `Slices`, `Selector`, `Components` and `Containers`

```
|-myFeature/
  |-components/
  |-containers/
  |-slices/
  |-hooks/
  |-selectors/
```

Few nuances with a feature and `index.js`,
we no need it in a feature's root folder,
so refer to particular sub-folder instead

```
import {MyComponent} from '../features/myFeature/components'
import {MyContainer} from '../features/myFeature/containers'
import {selectSomeFeatureData} from '../features/myFeature/selectors'
import {useSomeFeatureHook} from '../features/myFeature/hooks'

```

### Slices

Read [Slice](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#using-createslice)

Each slice is a module which combine action creators and single reducer for particular application store slice

Naming of files inside of slice folder

```
|-slices/
  |-index.js                   // exports all actions and 'reducer' for current slice
  |-mySliceNameReducer.js      // main reducer for current slice
  |-mySliceActions.js          // all actions creators (no any think actions here)
```

Example: usage of slice
```
import {reducer, specsRemoveSuccess } from './slices'

```
### Hooks

Hooks in that projects are [react-hook](https://reactjs.org/docs/hooks-custom.html) custom hooks which trigger side effects (API calls, timers, etc.).
Also, hooks provide access to redux store and application context. In case of middleware, put it here too

Naming  `use{SomeName}.jsx`

For example:

```
|-hooks/
  |-index.jsx                 // exports all hooks for current slice
  |-useEditSpec.jsx           // hook that contains functionality related to editing the specification
```

### Selectors

Selector functions for read-only operation over root app state.
Should use cache to optimize React re-rendering.

Naming `select{SomeName}.js`


### Components

*Reusable* React components, shouldn't have any dependencies to Redux, try to keep them as simple as possible

#### Organizing CSS

Keep CSS files near component, with the same name, for example

```
-MyComponent.jsx
-myComponent.css

```

About styles, see `Working with CSS` section


### Containers

Components which have dependencies to redux (actions, selectors etc)


For example:

```
|-containers/
  |-index.js
  |-PrivateRouter.jsx
  |-NavBar.jsx
  |-LoginButton.jsx
```


### Project Structure

### Root folders overview

* `utils/` - contains all reusable utilises, typings etc, organized in a way that it could be extracted as separates npm module without big effort
* `api/` - remote api endpoints
* `components/` - all reusable react components
* `features/` - application's features
* `store/` - contains functions/objects to build Redux store instance
* `hooks/` - contains common application hooks 

> Other folder in 'src' are not welcome

Example:

```

|-api/
|-utils/
|-components/
    |-layout/
        |-HeaderLayout.jsx
    |-Button.jsx
    |-Input.jsx
    |-Form.jsx
    |-index.jsx
|-features/
    |-myFeature/
        |-components/
            |-MyFeatureSpecificComponent1.jsx
            |-MyFeatureSpecificComponent2.jsx
            |-index.jsx
        |-containers/
            |-MyFeatureSpecificContainer1.jsx
            |-MyFeatureSpecificContainer2.jsx
            |-index.jsx
        |-effects/
            |-myFeatureEffects1.jsx
            |-myFeatureEffects2.jsx
            |-myFeatureEffects3.jsx
            |-index.jsx
        |-selectors/
            |-analyticBoardSectors.jsx
            |-index.jsx
        |-slices/
            |-analyticBoardActions.jsx
            |-analyticBoardReducer.jsx
            |-index.jsx
    |-otherFeature/
|-store/
|-hooks/
 ...
 AppContainer.jsx
 index.jsx
```

###  Working with CSS

We are using `Tailwindcss`, it has a bit different philosophy, then `Bootstrap` etc

To organize [CSS with components](https://tailwindcss.com/docs/extracting-components) follow next pattern

1. Preface utility classes
1. Extract a repeatable markup with utility classes to components
1. Combine utility classes in CSS classes when classnames became too long


### Redux

We are using

* [Redux Tooklikt](https://redux-toolkit.js.org/)
* [Immer](https://immerjs.github.io/immer/docs/introduction)
