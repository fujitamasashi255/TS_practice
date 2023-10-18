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

To refer to modules in node_modules on VScode, you can use Visual Studio Code Dev Containers extension.

detail:  
* [Typescript in Docker: "Cannot find module" in Visual Studio code host typescript compiler](https://stackoverflow.com/questions/60699604/typescript-in-docker-cannot-find-module-in-visual-studio-code-host-typescript)

<img width="1029" alt="スクリーンショット 2023-10-18 21 26 51" src="https://github.com/fujitamasashi255/TS_practice/assets/88495850/083e66f6-9dd4-42f6-a17b-9451ed18922c">
