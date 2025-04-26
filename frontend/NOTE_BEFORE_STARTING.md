Add this to ./frontend/package.json after react app created:

"scripts": {
"lint": "eslint . --ext .tsx,.ts",
"lint:fix": "eslint . --ext .tsx,.ts --fix",
"prettier:fix": "npx prettier --write ."
}
