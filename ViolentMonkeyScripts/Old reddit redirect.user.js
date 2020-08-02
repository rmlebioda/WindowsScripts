// ==UserScript==
// @name         Old reddit redirect
// @namespace    Violentmonkey Script
// @version      1.0
// @description  Redirects new website design to old one's
// @author       RML
// @match        *://www.reddit.com/*
// @grant        none
// @run-at        document-start
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Activated: Old reddit redirect");
    var re = /www.reddit.com/;
    var replace_to = 'old.reddit.com';
    window.location = document.URL.replace(re, replace_to);
})();
