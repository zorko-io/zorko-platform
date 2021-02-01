# zorko-platform

> Attention: Project in early stage.

Data Visualization Content Management Platform.
It contains from tree parts:

1. Visualization Content Management - server to create,store and share visualizations
1. Rendering Engine to display visualization by connecting to various data sources
1. Data Provide/Consumer communication broker and (API) to plugin any data source

### Pre-requirements

1. docker 19.03.8 or later
1. Node - 14.x.x or later
1. yarn - 1.22.4 or later
1. npx - 6.11.2


### Build Images

> Make sure that you don't run `yarn install` before. If you already have installed dependencies,
> run `yarn clean`

Run it once

```
./build-images.sh
```

> First time, it will take time to pull and build all necessary images

### Start Project in Dev Mode

Run `docker-compose up`

It starts all necessary services

### Add local project host

It's optional, add to you [host file](https://serverfault.com/questions/3646/how-do-i-setup-a-hosts-file-on-different-operating-systems)

```
# Zorko

127.0.0.1 zorko-io.local

```

So, you can just open `http://zorko-io.local`


## Contribution

What to contribute ? then follow [Contribution Guire](CONTRIBUTING.md)
