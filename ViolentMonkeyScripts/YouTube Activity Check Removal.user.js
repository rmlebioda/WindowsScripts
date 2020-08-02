// ==UserScript==
// @name        YouTube Activity Check Removal
// @namespace   https://chylex.com
// @include     https://youtube.com/*
// @include     https://*.youtube.com/*
// @version     1
// @run-at      document-end
// @grant       none
// ==/UserScript==

let timeout = 0;

let check = setInterval(function(){
  if (_yt_www && _yt_www.J){
    clearInterval(check);
    
    let prev = _yt_www.J;

    _yt_www.J = function(cls){
      if (cls && cls.startsWith("youthere-")){
        return null;
      }

      return prev.apply(this, arguments);
    };
  }
  else if (++timeout > 500){ // average should be about 5-10
    clearInterval(check);
  }
}, 1);
