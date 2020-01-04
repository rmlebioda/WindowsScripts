// ==UserScript==
// @name         VRMods adblock bypass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vrcmods.com/
// @grant        none
// ==/UserScript==

(function() {
    var re = /vrcmods\.com\/download\/(?=\d)/;
    window.location = document.URL.replace(re, "vrmods.com/download/direct/")
})();