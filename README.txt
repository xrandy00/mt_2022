== CZ ==
Nutné informace pro lokální vývoj a testování
Autor: Vojtěch Randýsek, xrandy00@vutbr.cz
GitHub repositář této práce: https://github.com/xrandy00/mt_2022
========

1. Kompilace a spuštění rozšíření Chrome 

cd js-vuln-det
npm install
npm run start ... pro debug 
npm run build ... pro release build 
Výsledky jsou ve složce js-vuln-det/dist 

Pokračujte podle některého návodu, jak spustit v Chromu nezabalené rozšíření, např. https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/
nebo využijte publikovanou verzi na https://chrome.google.com/webstore/detail/js-vulnerability-detector/bmcojnncgfmglejiinbdnahmkmbgifhk


2. Generování zranitelností 

cd vulnerability-processing
./run.sh


3. Spuštění testovacího webu

cd test-web
python3 -m http.server ... nebo jiný způsob lokálního hostingu webu - IIS, vschttpd, atd.

nebo využijte publikovanou verzi na https://www.stud.fit.vutbr.cz/~xrandy00


== EN ==
Necessary information for local development and testing
Author: Vojtěch Randýsek, xrandy00@vutbr.cz
GitHub repository of this project: https://github.com/xrandy00/mt_2022
========

1.  Building and running Chrome extension

cd js-vuln-det
npm install
npm run start ... for debugging
npm run build ... for building release bundle
Build is in js-vuln-det/dist folder

Follow a tutorial how to load unpacked Chrome extension, such as https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/
or install the release version from https://chrome.google.com/webstore/detail/js-vulnerability-detector/bmcojnncgfmglejiinbdnahmkmbgifhk

2. Recreating the vulnerability database

cd vulnerability-processing
./run.sh


3. Running the test web

cd test-web
npm install
python3 -m http.server ... or other means of local hosting, such as IIS or vschttpd

or access the release version at https://www.stud.fit.vutbr.cz/~xrandy00