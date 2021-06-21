# zorko-platform

> Attention: Project in early stage.

Data Visualization Content Management Platform.
It contains from tree parts:

1. Visualization Content Management - server to create, store and share visualizations
1. Rendering Engine to display visualization by connecting to various data sources
1. Visualization editor - service to edit visualization schemas
1. Data Provide/Consumer communication broker and (API) to plugin any data source

### Pre-requirements

1. docker 19.03.8 or later
1. Node - 14.x.x or later
1. yarn - 1.22.4 or later
1. npx - 6.11.2

### Run with docker

```
docker run -p 5000:7777 nesterone/zorko-standalone:latest
```

> `latest` - is a version which we build on each push to 'dev' branch

open `http://localhost:5000` and have a fun ;-)


### Build Images

> Make sure that you don't run `yarn install` before. If you already have installed dependencies,
> run `yarn clean`

> Clone zorko-io/editor project to folder `editor` at the same level with `zorko-platform`:

```
git clone https://github.com/zorko-io/editor.git
```

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

The vega-editor is accessible by url `http://127.0.0.1:8080`

## Contribution

What to contribute ? then follow [Contribution Guire](CONTRIBUTING.md)
