# TS_practice

## Set up
Reference: 「プロを目指す人のためのTypeScript入門　鈴木僚太」
```
docker compose up
docker compose exec node bash

npm install
```

Edit src/index.ts then transpile it into dist/index.js.

* manually
```
npx tsc
```

* watch mode
```
npx tsc -w
```

Run dist/index.js.
```
node dist/index.js
```
