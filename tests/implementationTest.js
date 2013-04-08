var prune = require("../index");
var tap = require("assert");

var html = '<body class="bodyclass"><div class="a1 c1">11111111<div src="sourceex" class="c2">222222222</div></div><div class="c3">33333333333</div><body>'
var css = 'body-wrapper{background:#bbb}c1{background:#eee;color:#333}c2{background:#ddd}c3{background:#ccc}';  

var pruned = prune("body",html, css);

console.log(pruned);
