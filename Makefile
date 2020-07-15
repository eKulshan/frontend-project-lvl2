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
gendiffIniJ:
	node bin/gendiff.js ./__tests__/__fixtures__/file1.ini ./__tests__/__fixtures__/file2.ini -f json
gendiffJsonJ:
	node bin/gendiff.js ./__tests__/__fixtures__/file1.ini ./__tests__/__fixtures__/file2.ini -f plain
gendiffYmlJ:
	node bin/gendiff.js ./__tests__/__fixtures__/file1.yml ./__tests__/__fixtures__/file2.yml -f plain
asciinem:
	cat ./__fixtures__/file1.json
	sleep 3s
	cat ./__fixtures__/file2.json
	sleep 3s
	node bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json -f plain
	sleep 3s