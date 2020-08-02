// ==UserScript==
// @name         VRMods adblock bypass
// @namespace    Violentmonkey Script
// @version      1.0
// @description  Bypasses download requirement
// @author       RML
// @match        *://vrcmods.com/download/*
// @grant        none
// ==/UserScript==

(function() {
    var re = /vrcmods\.com\/download\/(?=\d)/;
    window.open(document.URL.replace(re, "vrcmods.com/download/direct/"))
})();
