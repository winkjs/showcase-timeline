# winkNLP Timeline

[![built with winkNLP](https://img.shields.io/badge/built%20with-winkNLP-blueviolet)](https://github.com/winkjs/wink-nlp) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/winkjs/Lobby) [![Follow on Twitter](https://img.shields.io/twitter/follow/winkjs_org?style=social)](https://twitter.com/winkjs_org)

## Wikipedia Article to Timeline

[<img align="right" src="https://decisively.github.io/wink-logos/logo-title.png" width="100px" >](https://winkjs.org/)

This demo taken an article from English Wikipedia and converts it into a timeline. It does this by using the **entity recognition** in [winkNLP]((https://github.com/winkjs/wink-nlp). For all the `DATE`s that it finds it looks for the [shapes](https://winkjs.org/wink-nlp/its-as-helper.html) that can be understood by the JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime) object.
