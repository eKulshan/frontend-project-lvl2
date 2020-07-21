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
	node bin/gendiff.js ./__tests__/__fixtures__/file1.json ./__tests__/__fixtures__/file2.json -f json