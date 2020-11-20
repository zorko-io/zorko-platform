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
`Access`, `Manager`,`Engine` ,`Apps` (Client)  and  infrastructure components like `Util`


#### Access

Encapsulate volatility over interaction with third-party systems, like
databases, third-party api, etc.

#### Engine

Encapsulate volatility in one of the buisness's critical alghorithms , for example such tasks might be:

* suggest best visualization for selected data
* render selected visualization
* match data consumer with data provicer


#### Manager

Encapsulate volatility in business use cases, so it's a container for various
use cases, should allow easy to add and modify approach for use cases.

Allows calling use cases from outside only over message bus


#### Apps

Contains end user application, like a web portal server.
In other words it's a Client to our API


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
    |-engine-suggestion/
    |-access-spaces/
    |-manager-content/
    |-manager-data/
|-e2e/
|-tools/
```

#### Project Tools

// TODO: gh-18 - provide description of project tools

### Testing

#### Unit Tests

It's a must have to provive unite tests on `Util` layer, in some special cases they may contain integration
test as well.

// TODO: gh-18 - link to test harness tool

#### Integration Testing

We prefere integration testing on next layers: `Access`, `Engine` and `Manager`,
however unit testing are welcome, but discuss it with team before starting implementation

// TODO: gh-18 - link to test harness tool

#### E2E Tests

We prefare integration testing for UI instead of unit tests

// TODO: gh-18 - link to e2e docs


## How can I contribute ?

### Reporting Bugs

// TODO: gh-18 - provide a requirements to create bug

### Suggesting Enhancements

// TODO: gh-18 - provide a requirements to create enchancments

### Your First Code Contribution

To contribute code to the project, first what you should have it's an
issue with brief description of what your are doing, it could be an enchantment, or
a bug

### Branch Naming Convention

Branch name should follow next pattern `{username}/gh-{IssueNumber}`

Example:

User `walle` have an issue `#18` to provide docs, so branch should have a name `walle/gh-18`

### Commit Message Convention

Commit message should follow next pattern:

```
gh-{IssueNumber} <IssueTitle>
- {CommitMessageFirst}
- {CommitMessageSecond}
```

Example:

User `walle` is working on issue #18 with title `Dev Prep: Provide initial documentation for the project`
and decided to commit changes, so message would look like

```
gh-18 Dev Prep: Provide initial documentation for the project
- add brach and commit message naming convention
- do something else
- and something else
```

## Pull Request Process

When you done with a task and ready for review, just push your branch and create PR over `dev` branch

In case you are not done and still want to share your work to get early feedback, then push your branch and
create PR with `WIP` prefix, for example `WIP:Nesterone/gh-18`. Remove `WIP` when you are ready for final review

