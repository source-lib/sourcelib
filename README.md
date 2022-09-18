# Sourcelib
![MAINTAINED](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

![ESLINT](https://img.shields.io/badge/eslint-3A33D1?style=flat&logo=eslint&logoColor=white)
![TYPESCRIPT](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![NODE.JS](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![JEST](https://img.shields.io/badge/Jest-323330?style=flat&logo=Jest&logoColor=white)

A set of TypeScript libraries to work with the Source Engine.

This code used to be part of the [Source Engine Support extension for Visual Studio Code](https://github.com/StefanH-AT/Source-Engine-VSCode-Extension).

## Packages

This repository containy several packages.

| Name | Description | Install |
| ---- | ----------- | ------- |
| kv   | Keyvalue file parsing and tokenizer for reading, writing and inspecting keyvalue files | `npm install @sourcelib/kv`
| fs   | Source Engine virtual filesystem tools to read and write to a game's files | `npm install @sourcelib/fs`

## Projects using sourcelib

- [Source Engine Support Vscode extension](https://github.com/StefanH-AT/Source-Engine-VSCode-Extension).

## Development

sourcelib is built using npm workspaces to manage multiple npm packages at once.

**Install**
```shell
git clone https://github.com/source-lib/sourcelib.git
cd sourcelib
npm install --workspaces
```

**Compile everything**
```shell
npm run compile --workspaces
```

**Test everything**
```shell
npm run test --workspaces
npm run benchmark --workspaces
```

**Lint everything**
```shell
npm run lint --workspaces
```

Individual packages are located in the `packages` directory. They can be developed independently just like normal. For example:
```shell
cd packages/kv
npm run test
```

## Contributing
If you wish to contribute, please fork the repository and create a pull request!

## License
This project is licensed under the GNU Public License version 3: [License](LICENSE)

No code owned by Valve Software has been copied or used as reference. All this code has been written from scratch.