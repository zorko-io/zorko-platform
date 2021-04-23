- [x] migrate to mongo model from utils
- [x] start from contentAccess, by adding input validation and all basic CRUD actions
- [x] add simple iteration use cases (select, limit, offset)
- [x] provide 'total' calculation
- [x] migrate to proper validation enchancer
- [x] added input validation, clean up, add method
- [ ] add other methods for repository, with validation (get, remove, iterate)
- [ ] do the same for register, add permissions
~~- [ ] replace generic Content with Visualization (themes, data refs, templates later)~~
  [ ] instead of go away from content, we still may keep generic content (don't forget about history) also there is a need for just read method, which would return content  without wrappers
  again we are in experiencing mode, so if it's handly let add them, however current gal could be solved without 
  adding rich viz/theme/data refs support
- [ ] add Audit wrappers before integration

- [] after first integration, switch to preview generation script (aka future rendering engine) 