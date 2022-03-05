console.log('in evaluate');
const nodeList = document.querySelectorAll('script');

for (let i = 0; i < nodeList.length; ++i) {
  const node = nodeList[i];
  const ignore = node.getAttribute('ignore');

  if (ignore == 'true') {
    continue;
  }

  const script = node.innerHTML;
  console.log()
  if (script) {
    try {
      eval(script);
    } catch (error) {
      console.log('script could not have been evaluated', error);
    }
  }
}