# vue-wordpress

## Wordpress

- Docker for Mac

## Development

- Node.js >= 6.11.0
- gulp

## Setting

### Setup

Copy `./src/config/_config.default.json` and rename it to `config.default.json`.

### NPM Install

```sh
$ cd src/
$ npm i
```

### Watch (Start)

```sh
$ gulp
```

### Other Setting

`./src/gulp/tasks`

---

## c

`~/.bash_profile`などに、`export PATH="./bin:$PATH"`を追加しておくとPATHが通るので楽です。

### c docker build / c dc build

```sh
$ bin/c dc build
```

### c docker start / c dc start

```sh
$ bin/c dc start
```

### c docker stop / c dc stop

```sh
$ bin/c dc stop
```

### c docker ssh / c dc ssh

```sh
$ bin/c dc ssh
```