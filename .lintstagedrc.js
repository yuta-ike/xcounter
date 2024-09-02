const path = require("path")

const buildEslintCommand = (filenames) =>
  `eslint --fix --cache ${filenames.map((f) => path.relative(process.cwd(), f)).join(" ")}`

const buildPrettierCommand = (filenames) =>
  `prettier --write --cache --ignore-path .prettierignore ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`

const tscCommand = () => "tsc --noEmit"

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, buildPrettierCommand],
  "*.{ts,tsx}": [tscCommand],
  "*.json": [buildPrettierCommand],
}
