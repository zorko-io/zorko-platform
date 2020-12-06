# web-portal-client


## Start Project in Dev Mode

`yarn start`


## Design Decisions

We choose to build our client on top of React + [Redux Tooltip](https://redux-toolkit.js.org/) stack

Application consist within  `Features` each feature may has next layers

1. `Slices` -  provides reducer and actions to manipulate within particular feature state slice
1. `Selectors` - provides access to data required by a feature related to it's state slice
1. `Effects` - contains interactions with side effects
1. `Middlewares` - Redux middleware, main propose is to listen for app action flow and to some additional actions
1. `Components` - 'dummy' components, which has no relations for `Slices` and `Selectors`
1. `Containers` - components used by external features, usually use `Selectors` and Redux Actions

### Features

Parts of application which may contains UI. Feature usually contains store state, actions to work with that store and
already 'connected' UI component to application store.


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
import {reducer, specsRemoveSuccess } from './slices/specs'

```
### Effects

Effects in that projects are [redux-thunk](https://github.com/reduxjs/redux-thunk) functions which trigger side effects.
Like API calls, timers etc.  In case of middleware, put it here too

for example:

```
|-effects/
  |-index.js                   // exports all actions and 'reducer' for current slice
  |-openSpecEffect.js          // main reducer for current slice
  |-editSpecEffect.js          // all actions creators (no any think actions here)
  |-someMiddleware.js          // some middleware
```

### Selectors

Selector functions for read-only operation over root app state.
Should use cache to optimize React re-rendering.

### Components

*Reusable* React components, shouldn't have any dependencies to Redux, try to keep them as simple as possible

### Containers

Components which have dependencies to redux (actions, selectors etc), may contains react components not connected directly for
store and used only in one place

### Project Structure

### Root folders overview

`utils/` - contains all reusable utilises, typings etc, organized in a way that it could be extracted as separates npm module without big effort
`api/` - remote api endpoints
`components/` - all reusable react components
`features/` - application's features
`store/` - contains functions/objects to build Redux store instance

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
        |-slices/
            |-analyticBoardActions.jsx
            |-analyticBoardReducer.jsx
            |-index.jsx
    |-otherFeature/
|-store/
 ...
 AppContainer.jsx
 index.jsx
```
