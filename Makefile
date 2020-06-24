install:
	npm install
publish:
	npm publish --dry-run
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
lint:
	npx eslint .
gendiff:
	node bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json