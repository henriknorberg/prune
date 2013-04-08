var prune = require("../index");
var tap = require("assert");

var html = '<body class="bodyclass"><div class="a1 c1">11111111<div src="sourceex" class="c2">222222222</div></div><div class="a1 c3">33333333333<div src="sourceex" class="c4">4444444444444</div></div><body>'
var css = 'body-wrapper{background:#bbb}c1{background:#eee;color:#333}c2{background:#ddd}c3{background:#ccc}c4{background:#bbb}';  

var pruned = prune(".a1",html, css);

console.log(pruned);
