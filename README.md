# Chit-Chat

## Get it working in Docker
To get the reload on save changes working when running both `api` and `client` in Docker you need to add some configuration.

API - `tsconfig.build.json`:
```
# Append to file #
"watchOptions": {
    "watchFile": "dynamicPriorityPolling",
    "watchDirectory": "dynamicPriorityPolling",
    "excludeDirectories": [
      "**/node_modules",
      "dist"
    ]
  }
```

Client - `angular.json`:
```
# Place under projects.architect.serve.configurations.development #
"host": "0.0.0.0",
"poll": 100
```

## Generating a random JWT secret
To generate a string to use as JWT secret you can use:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```