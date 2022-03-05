console.log('in new evaluate');

function runScripts(element) {
  var list, scripts, index;

  // Get the scripts
  list = element.getElementsByTagName("script");
  scripts = [];
  for (index = 0; index < list.length; ++index) {

    const ignore = list[index].getAttribute('ignore');
    if (!ignore) {
      scripts[index] = list[index];
    }

  }
  list = undefined;

  // Run them in sequence
  continueLoading();

  function continueLoading() {
    var script, newscript;

    // While we have a script to load...
    while (scripts.length) {
      // Get it and remove it from the DOM
      script = scripts[0];
      script.parentNode.removeChild(script);
      scripts.splice(0, 1);

      // Create a replacement for it
      newscript = document.createElement('script');

      // External?
      if (script.src) {
        // Yes, we'll have to wait until it's loaded before continuing
        newscript.onerror = continueLoadingOnError;
        newscript.onload = continueLoadingOnLoad;
        newscript.onreadystatechange = continueLoadingOnReady;
        newscript.src = script.src;
      } else {
        // No, we can do it right away
        newscript.text = script.text;
      }

      // Start the script
      document.documentElement.appendChild(newscript);

      // If it's external, wait
      if (script.src) {
        return;
      }
    }

    // All scripts loaded
    newscript = undefined;

    // Callback on most browsers when a script is loaded

    function continueLoadingOnLoad() {
      // Defend against duplicate calls
      if (this === newscript) {
        continueLoading();
      }
    }

    // Callback on most browsers when a script fails to load

    function continueLoadingOnError() {
      // Defend against duplicate calls
      if (this === newscript) {
        continueLoading();
      }
    }

    // Callback on IE when a script's loading status changes

    function continueLoadingOnReady() {

      // Defend against duplicate calls and check whether the
      // script is complete (complete = loaded or error)
      if (this === newscript && this.readyState === "complete") {
        continueLoading();
      }
    }
  }
}
runScripts(document.documentElement);