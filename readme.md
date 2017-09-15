This is an example of structure used locally (during dev) to manage a group of es6 node modules.

# Presentation

packages contains a folder per node module that you want to work on.
you have to git clone all repository in that folder.
Then you do npm run link.

I'll write a script watching for every package files and running npm run compile when a file changes

