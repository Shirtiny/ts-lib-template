.DEFAULT_GOAL := build

init:
	@echo "Initialising the project"
	@sudo chmod -R 777 .scripts
	@./.scripts/init.sh

build_arch: test
	@echo "✅"

clean:
	@echo "🛁 Cleaning..."
	@npm run clean

clean_all:
	@echo "🧨 Clean all"
	@rm -Rf node_modules package-lock.json

test:
	@echo "Testing..."
	@./.scripts/test.sh

build: clean test
	@echo "👩‍🏭 Building..."
	@./.scripts/build.sh

version:
	@echo "👩 Version..."
	@./.scripts/version.sh

publish: version build
	@echo "📦 Publish package..."
	@./.scripts/publish.sh
