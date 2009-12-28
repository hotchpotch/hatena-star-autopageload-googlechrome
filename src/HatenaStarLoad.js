
var executeBrowserContext = function(funcOrString) {
    var code = "javascript:(" + encodeURIComponent(funcOrString.toString()) + ")();";
    location.href = code;
}

var starLoad = function(ev) {
    var code = function() {
        if (window.Hatena && Hatena.Star) window.addEventListener('AutoPatchWork.DOMNodeInserted', function(ev) {
            var loaders = Hatena.Star.__loaders || {}; Hatena.Star.__loaders  = loaders;
            var requestURL = ev.newValue;
            var loader = loaders[requestURL] || {}; loaders[requestURL] = loader;
            var frag = loader.frag || document.createDocumentFragment(); loader.frag = frag;

            var target = ev.target;
            var parentNode = target.parentNode;

            if (frag.childNodes.length == 0) {
                setTimeout(function() {
                    Hatena.Star.EntryLoader.loadNewEntries(frag);
                    parentNode.appendChild(frag);
                }, 100);
            }

            frag.appendChild(target);

        }, false);
    }
    executeBrowserContext(code);
    setTimeout(function() {
        executeBrowserContext(code.toString().replace('AutoPatchWork.DOMNodeInserted', 'AutoPagerize_DOMNodeInserted'));
    }, 10);
}

starLoad();
