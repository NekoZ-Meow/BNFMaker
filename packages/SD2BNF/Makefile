#!/bin/bash
# -*- coding: utf-8 -*-

BUILD = build-dev
#BUILD = build

NODE_MODULES = node_modules
SOURCE_DIR = src
OUT_FILE = index.js
OUT_DIR = dist
WORKSPACES = ../HashedCollections

NPM_RUN = npm run
NPM_LINT = lint
NPM_FORMAT = format
NPM_TEST = test

COVERAGE = coverage
REPORT_HTML = $(COVERAGE)/lcov-report/index.html

SOURCE_FILE_NAME_REGEXP= .*\.(ts|js|jsx|tsx)$$
CLEAN_FILES = $(COVERAGE) $(OUT_DIR)

all:
	$(NPM_RUN) $(BUILD)

format:
	$(NPM_RUN) $(NPM_FORMAT)

test:all
	node $(OUT_DIR)/$(OUT_FILE)

clean:
	@rm -rf $(CLEAN_FILES)
	@find . -name '.DS_Store' -exec rm -f {} ";"

wipe:clean
	@rm -rf $(NODE_MODULES) package-lock.json

pack:all
	npm pack

lint:
	$(NPM_RUN) $(NPM_LINT)

unittest:all
	$(NPM_RUN) $(NPM_TEST)

unittest-viz:unittest
	open $(REPORT_HTML)


prepare:wipe
	for each in $(WORKSPACES);do (cd $${each} && make;);done;
	npm install

