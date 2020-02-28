// The values provided below are the defaults.
// If you don't specify one of these properties,
// the default value will be applied.

module.exports = {
	printWidth: 120, // default: 80
	tabWidth: 4, // default: 2
	useTabs: true, // default: false
	semi: true,
	singleQuote: true, // default: false
	quoteProps: "as-needed",
	trailingComma: 'none',
	bracketSpacing: true,
	arrowParens: 'avoid',
	requirePragma: false,
	insertPragma: false,
	proseWrap: "preserve",
	htmlWhitespaceSensitivity: "ignore", // default: css
	endOfLine: "auto",
	overrides: [
		{
			files: ["*.yml", "*.yaml"],
			options: {
				tabWidth: 2,
				useTabs: false
			}
		}
	]
};
