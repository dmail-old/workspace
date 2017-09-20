This is an example of structure used locally (during dev) to manage a group of es6 node modules.

# Presentation

All the packages you're working on must be in the [packages](./packages) folder.

### To keep in mind

Assuming you got a `package-a` at `packages/package-a` and a `package-b` at `packages/package-b`.
Assuming `package-b` depends on `package-a`.

`npm run workspace link` ensures that `package-b/node_modules/package-a` is a symbolic link to `package-a` and not the distant version from npm or git. This way you can consume the local files from your machine and not the distant ones.

`npm run workspace watch` ensures mirroring of both `package-a/*` into `package-a/dist/*` and `package-b/*` into `package-b/dist/*`. It relies on `babel` to watch when a file change to compile and save it into `dist/*`. This way when `package-b` uses `package-b/node_modules/package-a` (which is a symlink to `package-a`) it receives fresh compiled files.

You can `npm install module-name` where module-name is an external dependency inside a `package-a` or `package-b`
You should not `npm install` inside `package-b` because it would destroy the symlink to `package-a` created by `npm run workspace link`

### How it works

`npm run workspace link` uses [symlink](https://github.com/clux/symlink) to auto `npm link` and `npm install` your dependencies.
`npm run workspace watch` collect all `packages/*` folder, if their `package.json` contains a `watch` script it runs `npm run watch` inside the package folder
