const nodeList = document.querySelectorAll('script');

for (let i = 0; i < nodeList.length; ++i) {
  const node = nodeList[i];
  const ignore = node.getAttribute('ignore');

  if (ignore == 'true') {
    continue;
  }

  const script = node.innerHTML;
  if (script) {
    eval(script);
  }
}