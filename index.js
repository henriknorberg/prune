var cssom = require('cssom');
var cheerio = require('cheerio');

module.exports = function (sel,html,css){
    var classes = []
    //load and parse html
    var markup = cheerio.load(html);
    var cssInHtml = markup(sel).find("*");
    //var kids = markup(sel).find("*");
    
    //Add in sel classes
    cssInHtml[cssInHtml.length] = markup(sel)[0];
    cssInHtml.length ++
    
    //Check for nothing found
    if(cssInHtml[0] === undefined){
        throw new Error("No selector found in document.")    
    }
    
    //Get classes from html:  atributes -> css -> flatten the arrays
    classes = [].concat.apply([],[].map.call(cssInHtml,getAtribs).map(getClassesFromHtml));
    console.log(classes) 
    
    //Get CSS styles from css: parse rules->filter selectors ->parseToString 
    var usedSelectors = cssom.parse(css).cssRules.filter(getUsedSelectors).map(parseSelectorsToString).join("");
    var unUsedSelectors = cssom.parse(css).cssRules.filter(getUnUsedSelectors).map(parseSelectorsToString).join("");
    //console.log(unUsedSelectors)
    
    return {usedCss:usedSelectors,unUsedCss:unUsedSelectors};
    
    //Helper functions  for HTML parsing
    
    function getAtribs(item){
        return item.attribs
    }
    
    function getClassesFromHtml(item){
         if (item.class !== undefined) return item.class.split(" ");
    }
    
    //Helper functions for CSS parsing
    function getUsedSelectors(item){
          return classes.some(function(r){
                return r === item.selectorText;
        });
    }
    function getUnUsedSelectors(item){
          return classes.every(function(r){
                return r !== item.selectorText;
        });
    }    
    function parseSelectorsToString(item){
        var css = "";
        var len = item.style.length;
        for (var i =0; i<len; i ++){
            css += "\t" + item.style[i] + ":" + item.style[item.style[i]] + ";\n" 
        }
        return item.selectorText + "{\n" + css +"}\n\n" 
    }
}