// ==UserScript==
// @name         Old reddit redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
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