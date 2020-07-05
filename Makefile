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
gendiffS:
	node bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json -f stylish
gendiffP:
	node bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json -f plain
asciinem:
	cat ./__fixtures__/before.json
	sleep 3s
	cat ./__fixtures__/after.json
	sleep 3s
	node bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json -f plain
	sleep 3s