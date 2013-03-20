function doneLoading(e) {
	var url = "http://buscadorgraficos-prospeccaohtml5.rhcloud.com/buscadorgraficos/rest/papeis/buscar?dataInicial=01/20/2010&dataFinal=01/02/2013&nomePapel=" + nomePapel ;
	var xhr = Ti.Network.createHTTPClient();
	Ti.API.info(url) ;
	
	xhr.onload = function() {
		$.loading.hide() ;
		try {
			$.webview.evalJS("loadData(" + this.responseText + ")") ;
			$.loading.hide() ;
		} catch(e) {
			//Ti.API.info(JSON.stringify(e));
			alert("Erro ao atualizar dados do gráfico: " + e) ;
			nav.close($) ;
		}
	} ;
	xhr.onerror = function(e) {
		//Ti.API.info(JSON.stringify(this));
		alert("Erro de conexão: " + this.status) ;
		nav.close($.window) ;
	} ;
	//xhr.setRequestHeader("Content-Type", "application/json-rpc");
	xhr.open("GET", url);
	Ti.API.info("Chamando request...") ;
	xhr.send();
}

var args = arguments[0];
var nomePapel = args.nomePapel ;
$.loading.show() ;
$.webview.url = "/etc/graph.html";