# API Gateway

> It's a POC, all code from that folder would be removed and created from scratch,
>after finalizing main POC

Expose a public API

## Steps to reproduce

1. Copy `.env.sample` to `.env`
1. Communicate to `nesterone` for `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
1. Update `.env` with client id and secret
1. Run `npm i`
1. Make sure that MONGO_ROOT_URL points to your instance
1. Run `npm run specs-to-previews`
1. Run `npm run seeds-to-db`
1. Run `npm start`
1. Run `curl http://localhost:8082/api/specs?limit=1`

