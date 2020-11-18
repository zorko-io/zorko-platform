# Contributing

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

When contributing to this repository, first discuss the change you wish to make via github issue.
note we have a code of conduct, please follow it in all your interactions with the project.

*Table of Contents*

* [Code of Conduct](code-of-condact.md)
* [What should I know before I get started?](#what-should-i-know-before-i-get-started)
* [Pull Request Process](#pull-request-process)

## What should I know before I get started ?

We are building open ecosystem for building visualization to find insight in data


### Design Decisions

We  have a semi-layered architecture, which contains from next layers:
`Access`, `Manager`, `Apps`  and  infrastructure components like `Util`


#### Access

Encapsulate volatility over interaction with third-party systems, like
databases, third-party api, etc.


#### Manager

Encapsulate volatility in business use cases, so it's a container for various
use cases, should allow easy to add and modify approach for use cases.

Allows calling use cases from outside only over message bus


#### Apps

Encapsulate end user application, like a web portal server


#### Utils

Encapsulate cross-cutting functionality like pub/sub, security, logging, diagnostic etc
It's designed  be used with any layer in a project.


### Project Structure

Overview of folders

 `app/` - contains our applications, which we run in docker image

 `packages/` - contains our various npm packages to be used in project
 `packages/util-*` - folders with our `Utils` packages
 `packages/access-*` -
 `packages/manager-*` - ...
 `package/test-helper-*` - testing helper


 `e2e/` -  end-to-end test suite
 `dev-ops/` -  dev-ops scripts and accepts
 `tools/` - project tools

Example:

```
|-apps/
    web-portal-server/
    web-portal-client/
|-packages/
    |-util-error/
    |-util-security/
    |-util-logging/
    |-engine-rendering/
    |-engine-refactoring/
    |-access-spaces/
    |-manager-content/
    |-manager-data/
|-e2e/
|-tools/
```

#### Project Tools





### Unit Tests

Project has a requirement for high level code coverage with unit test for next entitles: `Presenters`, `Reducers` and
`Selectors`. Test runner has a configuration for coverage threshold, it's a quite big, around ~90% for `Presenters`,`Reducers` and `Selectors`

> Unit tests for UI elements like `components` and/or `containers` are not welcome



### E2E Tests

...


## How can I contribute ?

### Reporting Bugs

...

### Suggesting Enhancements

...

### Your First Code Contribution

...

## Pull Request Process

...
