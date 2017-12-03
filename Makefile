REPORTER = list
MOCHA_OPTS = --ui bdd -c


db:
	echo Seeding blog *****************************************************
	./src/db/seed.sh
test:
	clear
	./src/db/seed.sh
	echo Starting test ******************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	./test
	echo Ending test
user:
	clear
	echo Testing post *******************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	./test/user.spec.js
	echo Ending test
post: 
	clear
	echo Testing post *******************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	./test/post.spec.js
	echo Ending test
start:
	node ./src/app

.PHONY: test db start