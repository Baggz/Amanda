all: compile

compile:
	@node ./tools/compile.js

build: components
	@component build --dev

components: component.json
	@component install --dev
