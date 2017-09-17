const createSetupFolderCommand = require("./setupFolder.js")
const createGitCloneCommands = require("./gitClone.js")
const createSymlinkCommand = require("./symlink.js")
const { execSequence, exposeModuleCommand } = require("../command")

const createSetupCommands = () => {
	// il manque plusieurs chose, tout dabord la possibilité
	// de créer une commande qui n'en soit pas vraiment une mais se comporte comme tel
	// pour "faire genre" et qu'elle puisse être utilisé pas execSequence
	// une sorte de fromPromise qui permettrais à setupFolder d'être combiné aux autres
	// ensuite ben si je fais execSequence je veux pouvoir tout de même éxécuter
	// les commandes retournée par createGitCloneCommands en parallel
	// donc enchainé en sequence mais certaine étape se font en série en étant wrap
	// enfin pouvoir contrôller l'éxécution des commande suivante en fonction de la réponse des précédente?
	// lorsque setupfolder retourne zéro mais en disant hey j'ai abort parce que le folder
	// existe alors j'aimerais pouvoir dire a bah dans ce cas c'est une erreur
	// en gros il faut une api par dessus en mode programmation fonctionnelle....
	// comme les seuls scripts importants marchent déjà (symlink et watch)
	// ca sera pour un autre jour... ou jamais xD
	// .then(value => (value.startsWith("aborted") ? Promise.reject(value) : value))
	const commands = [createSetupFolderCommand, createGitCloneCommands, createSymlinkCommand]
	return commands
}

exposeModuleCommand(module, createSetupCommands, execSequence)
