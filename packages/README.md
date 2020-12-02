# util-wev-api-client

Provide a web api client to access web API, as in browser as in node environments


## Basic Usage

```
import {createClient} from 'util-web-api-client'

const api = createClient({
   // various configs here
})

const {auth, visualizations} = api

auth
    .createToken({
        login: 'joe',
        password: 'qwerty'
    })
    .then(token => {
        // handle token
    })
    .catch(error => {
        // handle error
    })


```
