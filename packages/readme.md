The package folder is meant to contain the packages you're working on.
This repository will ignore all file/folder inside it so that your changes are ignored by this repo.

## Why ?

[symlink](https://github.com/clux/symlink) is a dependency of this repo and expect modules to be under a common directory.
It comes with a major benefit : You can drop a package here and we know it's a local package you want to work on.

### How to create a new package

- `mkdir package-name`
- `cd package-name`
- `npm run workspace-init`

After that you may want to:
- open `package-name/package.json` and change `"name": "template"` into `"name": "package-name"`
- `git init` and push your repository on github

### How to add an existing package

You can directly `git clone` you previously created package into this folder.

### Everytime a package gets added/removed from this folder

- You should `npm run workspace link` to ensure all dependencies are `npm link`ed.
- You may want to `cd package-name && npm run watch` to ensure babel recompile a file when it changes.


