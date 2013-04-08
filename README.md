Prunes unused CSS from a HTML element

```
var prune = require("../index");
var tap = require("assert");

var html = '<body class="bodyclass"><div class="a1 c1">11111111<div src="sourceex" class="c2">222222222</div></div><div class="c3">33333333333</div><body>'
var css = 'body-wrapper{background:#bbb}c1{background:#eee;color:#333}c2{background:#ddd}c3{background:#ccc}';  

var pruned = prune("body",html, css);
```

Returns: 
```
{ usedCss: 'c1{\n\tbackground:#eee;\n\tcolor:#333;\n}\n\nc2{\n\tbackground:#ddd;\n}\n\nc3{\n\tbackground:#ccc;\n}\n\n',
  unUsedCss: 'body-wrapper{\n\tbackground:#bbb;\n}\n\n' }
```  