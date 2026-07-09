HOST ?= localhost:3000
CONFIG ?= rip-config.yaml
OUT ?= DWIN_SET

.PHONY: dev build install install-py install-browser clean rip

dev:
	npm run dev

build:
	npm run build

install: install-js install-py

install-js:
	npm install

install-py:
	./venv/bin/pip install -r ripper/requirements.txt

install-browser: install-py
	./venv/bin/playwright install chromium

clean:
	@rm -rf $(OUT)/*
	@echo "Cleaned $(OUT)/"

rip: clean
	@echo "Starting dev server..."
	@npm run dev & \
	  PID=$$!; \
	  sleep 3; \
	  echo "Ripping assets from $(HOST) using $(CONFIG)..."; \
	  ./venv/bin/python3 ripper/rip.py http://$(HOST) --config $(CONFIG) --out $(OUT); \
	  echo "Stopping server..."; \
	  kill $$PID 2>/dev/null; \
	  echo "Done."
