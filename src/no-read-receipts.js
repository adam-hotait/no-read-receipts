popupTitles = ["read receipts requested", "confirmations de lecture demandées"];

(function() {
  function processNodes(nodes) {
    for(let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if(typeof node.tagName === 'undefined' || node.tagName.toLowerCase() !== "button") {
        return;
      }
      if(node.getAttribute("name") === "Later") {
        const text = node.parentNode.parentNode.textContent;
        if (popupTitles.some(title => {
          return text.match(new RegExp(title, "i"));
        })) {
          node.click();
        }
      }
    }
  }

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      processNodes(mutation.addedNodes);
    });
  });
  observer.observe(document, { childList: true, subtree: true });
})();