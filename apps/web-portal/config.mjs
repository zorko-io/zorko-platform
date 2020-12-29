// TODO: Provide App configuration definition with confme
// idea to have a 'util-confme'
// with access to config content and able to configure() it's config as we go
// check on how configuration behaves withing app and outside in a module
// or we may use a generate config script to combine all, it's maybe handy to
// generate all confme file as a post-install task directly in app directory
// label: dev-prep
export const config = {
  http: {
    port: 7777
  }
}
