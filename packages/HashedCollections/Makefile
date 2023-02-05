#!/bin/bash
# -*- coding: utf-8 -*-

BUILD = build-dev
#BUILD = build
NODE_MODULES = node_modules
SOURCE_DIR = src
OUT_FILE = index.js
OUT_DIR = dist
HASHED_COLLECTIONS_MODULE = hashed-collections-1.0.0.tgz

NPM_RUN = npm run
NPM_LINT = lint
NPM_FORMAT = format
NPM_TEST = test

COVERAGE = coverage
REPORT_HTML = $(COVERAGE)/lcov-report/index.html

SOURCE_FILE_NAME_REGEXP= .*\.(ts|js|jsx|tsx)$$

all:
	@

format:
	$(NPM_RUN) $(NPM_FORMAT)

test:all
	node $(OUT_DIR)/$(OUT_FILE)

clean:
	@rm -rf $(COVERAGE) $(OUT_DIR)
	@find . -name '.DS_Store' -exec rm -f {} ";"

wipe:clean
	@rm -rf $(NODE_MODULES) $(HASHED_COLLECTIONS_MODULE)

pack:all
	npm pack

lint:
	$(NPM_RUN) $(NPM_LINT)

unittest:all
	$(NPM_RUN) $(NPM_TEST)

unittest-viz:unittest
	open $(REPORT_HTML)

prepare:
	npm install

