# url-shortener

## Serving whole app with a single server

### Advantages

- Sharing type definitions easily
- No CORS issues
- Single server to deploy - no need to deploy static files and API separately

### Disadvantages

- Need to set `Cache-Control` HTTP header manually to cache static content over DNS

## Docker setup

```
docker-compose up --build
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Run back-end tests

```
npm run test:server
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
