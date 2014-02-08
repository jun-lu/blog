
/**
	根据数据构建所有HTML片段

*/

APP.htmlFragment = {
	tmpl:function (a,b){var c=/\W/.test(a)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+a.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):cache[a]=cache[a]||tmpl(document.getElementById(a).innerHTML);return b?c(b):c}, 
	fissionMoney:function( data ){
		var html = $("#tipTMPL1").html();
		return this.tmpl( html, data||{} );
	}
};