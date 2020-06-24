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
gendiffJSON:
	node bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json
gendiffYAML:
	node bin/gendiff.js ./__fixtures__/before.yml ./__fixtures__/after.yml
asciinem:
	cat ./__fixtures__/before.ini
	sleep 3s
	cat ./__fixtures__/after.ini
	sleep 3s
	node bin/gendiff.js ./__fixtures__/before.ini ./__fixtures__/after.ini
	sleep 3s