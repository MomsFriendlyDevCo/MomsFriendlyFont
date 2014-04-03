install: install-apt install-woff install-gem

install-apt:
	sudo apt-get install -y fontforge ttfautohint ttfautohint ruby1.9.1-dev

install-woff:
	wget http://people.mozilla.com/~jkew/woff/woff-code-latest.zip
	unzip woff-code-latest.zip -d sfnt2woff
	rm woff-code-latest.zip
	cd sfnt2woff; \
		make
	sudo mv sfnt2woff/sfnt2woff /usr/local/bin/
	rm -r sfnt2woff

install-gem:
	gem install fontcustom
