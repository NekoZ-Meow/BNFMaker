NPM = npm
NPM_RUN = $(NPM) run
PACKAGES = packages
WORKSPACES = $(PACKAGES)/BNFMakerWeb $(PACKAGES)/HashedCollection $(PACKAGES)/SD2BNF

all:
	@

web-build:
	$(NPM_RUN) web-build -OUT="$$(pwd)/docs"

deploy:
	if [ "$$(git status --short $(OUT_DIR))" = "" ];then echo "a" ;fi

format:
	$(NPM_RUN) format

clean:
	@for each in $(WORKSPACES);do echo "$${each} make clean..."; (cd $(WORKSPACES); make clean);done

wipe:clean
	@for each in $(WORKSPACES);do "$${each} make wipe..."; (cd $(WORKSPACES); make wipe);done

prepare:
	$(NPM) install
