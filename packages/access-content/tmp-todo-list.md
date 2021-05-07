- [x] migrate to mongo model from utils
- [x] start from contentAccess, by adding input validation and all basic CRUD actions
- [x] add simple iteration use cases (select, limit, offset)
- [x] provide 'total' calculation
- [x] migrate to proper validation enchancer
- [x] added input validation, clean up, add method
- [x] add other methods for repository, with validation (get, remove, iterate)
- [x] make content more content specific and operate over uri instead of resource ids
- [x] run delete for content when removing resource
- [x] add validation for register, add permissions ???
~~- [ ] replace generic Content with Visualization (themes, data refs, templates later)~~
  ~~[ ] instead of go away from content, we still may keep generic content (don't forget about history) also there is a need for just read method, which would return content  without wrappers
  again we are in experiencing mode, so if it's handly let add them, however current gal could be solved without 
  adding rich viz/theme/data refs support~~
  
~~- what about renaming content to history ? .... (later)~~

- [] add a very simple script with few  visualization (inline data) and their previews already generated

- [] after first integration, switch to preview generation script (aka future rendering engine) 
- [] add mongo to docker and make sure that access content at least available on webapp level (not a command integration)
- [ ] add Audit wrappers before integration (parallel with adding docker)


idea of separation of layers 

------engine---

engine-rendering - research and play around with vega server render
  - browser
  - node

------ access---- 

| access-tenant | access-content | access-project | access-data-source | access-flow





access-data-source

Package to encapsulate volatility over various datasources, allow to connext, get metadate and
run data streams over it ...
