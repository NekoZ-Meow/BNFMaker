NPM = npm
NPM_RUN = $(NPM) run
PACKAGES = packages
OUT_DIR = "$$(pwd)/docs"
WORKSPACES = $(PACKAGES)/BNFMakerWeb $(PACKAGES)/HashedCollection $(PACKAGES)/SD2BNF

all:
	@

web-build:
	$(NPM_RUN) web-build -OUT=$(OUT_DIR)
	touch $(OUT_DIR)/.nojekyll; \

deploy:web-build
	@if [ "$$(git status --short ./)" != "" ];then \
		git add ./; \
		echo -n please enter commit massage: ; \
		read message; \
		git commit -m "$${message}"; \
		git push origin main; \
	fi

format:
	$(NPM_RUN) format

clean:
	@for each in $(WORKSPACES);do echo "$${each} make clean..."; (cd $(WORKSPACES); make clean);done

wipe:clean
	@for each in $(WORKSPACES);do "$${each} make wipe..."; (cd $(WORKSPACES); make wipe);done

prepare:
	$(NPM) install
