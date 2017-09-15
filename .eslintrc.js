const defaultRules = {
	"comma-dangle": [2, "never"],
	"no-cond-assign": 2,
	"no-constant-condition": 2,
	"no-control-regex": 2,
	"no-debugger": 2,
	"no-dupe-args": 2,
	"no-dupe-keys": 2,
	"no-duplicate-case": 2,
	"no-empty-character-class": 2,
	"no-ex-assign": 2,
	"no-extra-boolean-cast": 2,
	"no-extra-semi": 2,
	"no-func-assign": 2,
	"no-inner-declarations": 2,
	"no-invalid-regexp": 2,
	"no-irregular-whitespace": 2,
	"no-negated-in-lhs": 2,
	"no-obj-calls": 2,
	"no-regex-spaces": 2,
	"no-sparse-arrays": 2,
	"no-unreachable": 2,
	"use-isnan": 2,
	"valid-typeof": 2,
	"no-unexpected-multiline": 2,
	"accessor-pairs": 2,
	"array-callback-return": 2,
	"block-scoped-var": 2,
	curly: 2,
	"default-case": 2,
	"dot-notation": 2,
	"dot-location": [2, "property"],
	eqeqeq: 2,
	"guard-for-in": 2,
	"no-alert": 2,
	"no-caller": 2,
	"no-case-declarations": 2,
	"no-div-regex": 2,
	"no-else-return": 2,
	"no-empty-pattern": 2,
	"no-eq-null": 2,
	"no-eval": 2,
	"no-extend-native": 2,
	"no-extra-bind": 2,
	"no-extra-label": 2,
	"no-fallthrough": 2,
	"no-floating-decimal": 2,
	"no-implicit-coercion": 2,
	"no-implicit-globals": 2,
	"no-implied-eval": 2,
	"no-iterator": 2,
	"no-labels": 2,
	"no-lone-blocks": 2,
	"no-loop-func": 2,
	"no-multi-spaces": 2,
	"no-multi-str": 2,
	"no-native-reassign": 2,
	"no-new-func": 2,
	"no-new-wrappers": 2,
	"no-new": 2,
	"no-octal-escape": 2,
	"no-octal": 2,
	"no-proto": 2,
	"no-redeclare": 2,
	"no-return-assign": [2, "always"],
	"no-script-url": 2,
	"no-self-assign": 2,
	"no-self-compare": 2,
	"no-sequences": 2,
	"no-throw-literal": 2,
	"no-unmodified-loop-condition": 2,
	"no-unused-expressions": 2,
	"no-unused-labels": 2,
	"no-useless-call": 2,
	"no-useless-concat": 2,
	"no-void": 2,
	"no-warning-comments": 1,
	"no-with": 2,
	"wrap-iife": [2, "inside"],
	yoda: 2,
	"no-delete-var": 2,
	"no-label-var": 2,
	"no-shadow-restricted-names": 2,
	"no-undef-init": 2,
	"no-undef": [
		2,
		{
			typeof: true
		}
	],
	"no-unused-vars": 2,
	"no-use-before-define": [2, "nofunc"],
	"handle-callback-err": 1,
	"no-mixed-requires": [
		2,
		{
			grouping: true,
			allowCall: true
		}
	],
	"no-new-require": 2,
	"no-path-concat": 2,
	"no-restricted-imports": [2, "domain", "freelist", "smalloc", "sys", "colors"],
	"no-restricted-modules": [2, "domain", "freelist", "smalloc", "sys", "colors"],
	"array-bracket-spacing": [2, "never"],
	"brace-style": [
		2,
		"1tbs",
		{
			allowSingleLine: false
		}
	],
	camelcase: [
		2,
		{
			properties: "always"
		}
	],
	"comma-spacing": [
		2,
		{
			before: false,
			after: true
		}
	],
	"comma-style": [2, "last"],
	"computed-property-spacing": [2, "never"],
	"eol-last": 2,
	indent: [
		2,
		4,
		{
			SwitchCase: 1
		}
	],
	"jsx-quotes": 2,
	"key-spacing": [
		2,
		{
			beforeColon: false,
			afterColon: true
		}
	],
	"keyword-spacing": 2,
	"linebreak-style": [2, "unix"],
	"max-nested-callbacks": [1, 4],
	"new-cap": [
		2,
		{
			newIsCap: true,
			capIsNew: true
		}
	],
	"new-parens": 2,
	"no-array-constructor": 2,
	"no-lonely-if": 2,
	"no-mixed-spaces-and-tabs": 2,
	"no-multiple-empty-lines": [
		2,
		{
			max: 1
		}
	],
	"no-nested-ternary": 2,
	"no-negated-condition": 2,
	"no-new-object": 2,
	"no-restricted-syntax": [2, "WithStatement"],
	"no-whitespace-before-property": 2,
	"no-spaced-func": 2,
	"no-trailing-spaces": 2,
	"no-unneeded-ternary": 2,
	"object-curly-spacing": [2, "never"],
	"one-var": [2, "never"],
	"one-var-declaration-per-line": 2,
	"operator-assignment": [2, "always"],
	"operator-linebreak": [2, "after"],
	"padded-blocks": [2, "never"],
	"quote-props": [2, "as-needed"],
	"semi-spacing": [
		2,
		{
			before: false,
			after: true
		}
	],
	semi: [2, "always"],
	"space-before-blocks": [2, "always"],
	"space-in-parens": [2, "never"],
	"space-infix-ops": 2,
	"space-unary-ops": 2,
	"spaced-comment": [
		2,
		"always",
		{
			markers: ["!"]
		}
	],
	"arrow-parens": [2, "as-needed"],
	"arrow-spacing": [
		2,
		{
			before: true,
			after: true
		}
	],
	"constructor-super": 2,
	"generator-star-spacing": [2, "both"],
	"no-class-assign": 2,
	"no-const-assign": 2,
	"no-dupe-class-members": 2,
	"no-new-symbol": 2,
	"no-this-before-super": 2,
	"no-useless-constructor": 2,
	"template-curly-spacing": 2,
	"yield-star-spacing": [2, "both"],
	"valid-jsdoc": [
		2,
		{
			requireReturn: false,
			prefer: {
				returns: "return"
			}
		}
	],
	"space-before-function-paren": [2, "never"],
	"max-len": [
		1,
		120,
		4,
		{
			ignoreComments: true,
			ignoreUrls: true,
			ignorePattern: "^\\s*var\\s.+=\\s.+\\/.*?\\/;$"
		}
	]
}
const ruleOverrides = {
	indent: [
		"warn",
		"tab",
		// I don't want to force people identation width to be 2 or 4
		// they decide how much space a tab char takes (2, 4, 100) in their environment
		// thanks to .editorconfig github respect a width of 2 for tabs so that
		// remote public version remains consistent
		// (see http://stackoverflow.com/a/33831598)
		{
			SwitchCase: 1
		}
	],
	quotes: [
		"off", // because painful when you swtich between ""``
		"double" // because JSON requires it so facilitates it
	],
	"prefer-template": ["warn"],
	"import/default": ["error"],
	"import/no-unresolved": [
		"error",
		{
			commonjs: true,
			amd: false
		}
	],
	"import/named": ["error"],
	"import/namespace": [
		"error",
		{
			allowComputed: true
		}
	],
	"import/no-absolute-path": ["error"],
	"import/no-dynamic-require": ["error"],
	"import/export": ["error"],
	"import/no-named-as-default": ["warn"],
	"import/first": ["warn"],
	"import/no-duplicates": ["warn"],
	"import/newline-after-import": ["warn"],
	"import/max-dependencies": [
		"warn",
		{
			max: 10
		}
	],
	// "import/no-anonymous-default-export": [
	//     "error",
	//     {
	//         "allowArray": true,
	//         "allowArrowFunction": false,
	//         "allowAnonymousClass": false,
	//         "allowAnonymousFunction": false,
	//         "allowLiteral": true,
	//         "allowObject": true
	//     }
	// ],
	/*
	because it seems like a good idea at first (to force specific quote style) but then
	you fall into edge case where you want to keep quote or not for good reasons
	and you dont want a too restrictive rule to get in your way
	*/
	"quote-props": [
		"error",
		"as-needed",
		{
			keywords: false,
			numbers: true,
			unnecessary: false
		}
	],
	"no-warning-comments": ["off"],
	/*
	Variable hoisting is bad, I agree
	Function hoisting is mega cool because it lets your structure you code so that surface methods
	are at the top and implementation detail at the bottom.

	Sometimes your variable contains a function, in that case this variable is used
	as a function and becomes a sort of function hoisting but eslint can't
	This can happen when you bind, curry, memoize your functions.
	It happen very often and I don't want to write // eslint-disable-line no-use-before-define
	All the time.
	However I'll not use variable hoisting anywhere, I hate that anyway.

	Considering all of this, I'm disabling "no-use-before-define".
	*/
	// "no-use-before-define": [
	// 	"off"
	// ],
	"no-eval": ["off"],
	semi: ["error", "never"],
	"brace-style": ["error", "1tbs"],
	"arrow-parens": [
		"error",
		"as-needed"
		// {
		//     "requireForBlockBody": true
		// }
	],
	"comma-dangle": [
		"error",
		{
			arrays: "only-multiline",
			objects: "only-multiline",
			imports: "only-multiline",
			exports: "only-multiline",
			functions: "only-multiline"
		}
	]
}

const flowRules = {
	"flowtype/boolean-style": [2, "boolean"],
	"flowtype/define-flow-type": 1,
	"flowtype/delimiter-dangle": [2, "never"],
	"flowtype/generic-spacing": [2, "never"],
	"flowtype/no-primitive-constructor-types": 2,
	"flowtype/no-types-missing-file-annotation": ["off"],
	"flowtype/no-weak-types": ["off"],
	"flowtype/object-type-delimiter": [2, "comma"],
	"flowtype/require-parameter-type": ["off"],
	"flowtype/require-return-type": [
		"off",
		"always",
		{
			annotateUndefined: "never"
		}
	],
	"flowtype/require-valid-file-annotation": ["off"],
	"flowtype/semi": ["off", "always"],
	"flowtype/space-after-type-colon": [2, "always"],
	"flowtype/space-before-generic-bracket": [2, "never"],
	"flowtype/space-before-type-colon": [2, "never"],
	"flowtype/type-id-match": [2, "^([A-Z][a-z0-9]+)+Type$"],
	"flowtype/union-intersection-spacing": [2, "always"],
	"flowtype/use-flow-type": 1,
	"flowtype/valid-syntax": 1
}

module.exports = {
	parser: "babel-eslint",
	parserOptions: {
		ecmaVersion: 6,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true
		}
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	globals: {
		// jsenv: true
	},
	plugins: ["import"],
	settings: {
		"import/extensions": [".js", ".jsx", ".mjs"]
		// "flowtype": {
		//   "onlyFilesWithFlowAnnotation": true
		// }
	},
	rules: Object.assign(
		{},
		defaultRules,
		ruleOverrides
		// ...flowRules
	)
}
