#!/bin/bash
# -*- coding: utf-8 -*-

NODE = node

OUT_DIR = out
NODE_MODULES = node_modules
CLEAN_FILES = .next out

NPM_RUN = npm run
NPM_LINT = lint
NPM_FORMAT = format
NEXT_DEVELOP = develop
NEXT_BUILD = build
NEXT_START = start

DEV_URL = http://localhost:3000
#DEV_URL = http://172.20.58.121:3000
#OPEN_APP_NAME = 'Google Chrome'
#OPEN_APP_NAME = 'Safari'
OPEN_APP_NAME = 'Firefox'


all:
	@

build:all
	$(NPM_RUN) $(NEXT_BUILD)

develop:all
	(sleep 5; open -a $(OPEN_APP_NAME) $(DEV_URL))& \
	$(NPM_RUN) $(NEXT_DEVELOP)

export:build
	$(NPM_RUN) export -OUT=$(OUT_DIR)

start:
	(sleep 5; open -a $(OPEN_APP_NAME) $(DEV_URL))& \
	$(NPM_RUN) $(NEXT_START)

test:develop
	@

format:
	$(NPM_RUN) $(NPM_FORMAT)

lint:
	$(NPM_RUN) $(NPM_LINT)

clean:
	@rm -rf $(CLEAN_FILES)
	@find . -name '.DS_Store' -exec rm -f {} ";"

wipe:clean
	@rm -rf $(NODE_MODULES) package-lock.json

prepare:wipe
	npm install
