function doneLoading(e) {
	$.loading.message = "Carregando URL..." ;
	var url = "http://buscadorgraficos-prospeccaohtml5.rhcloud.com/buscadorgraficos/rest/papeis/buscar?dataInicial=01/20/2010&dataFinal=01/02/2013&nomePapel=" + nomePapel ;
	var xhr = Ti.Network.createHTTPClient();
	Ti.API.info(url) ;
	
	xhr.onload = function() {
		try {
			$.loading.message = "Carregando Gráfico..." ;
			$.webview.evalJS("loadData(" + this.responseText + ")") ;
			$.loading.message = "Plotando Gráfico..." ;
		} catch(e) {
			//Ti.API.info(JSON.stringify(e));
			alert("Erro ao atualizar dados do gráfico: " + e) ;
			nav.close($) ;
		}
	} ;
	xhr.onerror = function(e) {
		//Ti.API.info(JSON.stringify(this));
		alert("Erro de conexão: " + this.status) ;
		$.loading.hide() ;
	} ;
	//xhr.setRequestHeader("Content-Type", "application/json-rpc");
	xhr.open("GET", url);
	Ti.API.info("Chamando request...") ;
	xhr.send();
}

function chartLoaded(e) {
	Ti.App.removeEventListener('app:chartLoaded', chartLoaded) ;
	$.loading.hide() ;
}

Ti.App.addEventListener('app:chartLoaded', chartLoaded);

var args = arguments[0];
var nomePapel = args.nomePapel ;
$.loading.show() ;
$.loading.message = "Carregando HTML..." ;
$.webview.url = "/etc/graph.html";