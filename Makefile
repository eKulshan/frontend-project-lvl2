install:
	npm install
publish:
	npm publish --dry-run
test:
	gendiff ./files/before.json ~/work/hexlet/frontend-project-lvl2/files/after.json
lint:
	npx eslint .
gendiff:
	node bin/gendiff.js
asciinema:
	cat ./files/before.json
	sleep 3s
	cat ./files/after.json
	sleep 3s
	gendiff ./files/before.json ./files/after.json
	sleep 3s