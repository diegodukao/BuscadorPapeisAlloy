var iOS = (Ti.Platform.name === 'iPhone OS') ;
var nav ;

function cleanFields(e){
	$.pl_min.value = "";
	$.pl_max.value = "";
	$.roe_min.value = "";
	$.roe_max.value = "";
	$.divptr_min.value = "";
	$.divptr_max.value = "";
};

function setScreenEnable(enable)
{
	$.pl_min.enabled = enable;
	$.pl_max.enabled = enable;
	$.roe_min.enabled = enable;
	$.roe_max.enabled = enable;
	$.divptr_min.enabled = enable;
	$.divptr_max.enabled = enable;
	$.btn_limpar.enabled = enable ;
	$.btn_buscar.enabled = enable ;
	if (enable) {
		$.loading.hide() ;
	} else {
		$.loading.show() ;
	}
}

function dismissKeyboard(e)
{
	this.blur() ;
}

function isNumber(n)
{
  return (n.length == 0) || (!isNaN(parseFloat(n)) && isFinite(n)) ;
}

function validateNumber(e)
{
	Ti.API.info("validateNumber: " + e.value) ;
	if ( ! isNumber(e.value) ) {
		e.source.color = "red" ;
	} else {
		e.source.color = "black" ;
	}
}

function search(e) {
	// Valida os campos
	if ( ! isNumber($.pl_min.value) ||
		 ! isNumber($.pl_max.value) ||
		 ! isNumber($.roe_min.value) ||
		 ! isNumber($.roe_max.value) ||
		 ! isNumber($.divptr_min.value) ||
		 ! isNumber($.divptr_max.value) )
	{
		alert("Digite um número válido nos campos marcados.")
		return ;
	}

	// Monta url
	var url = "https://buscadorpapeis-prospeccaohtml5.rhcloud.com/buscadorpapeis/rest/papeis/buscar?" ;
	if ( $.pl_min.value.length > 0 ) url += "&plMin=" + $.pl_min.value ;
	if ( $.pl_max.value.length > 0 ) url += "&plMax=" + $.pl_max.value ;
	if ( $.roe_min.value.length > 0 ) url += "&roeMin=" + ($.roe_min.value/100) ;
	if ( $.roe_max.value.length > 0 ) url += "&roeMax=" + ($.roe_max.value/100) ;
	if ( $.divptr_min.value.length > 0 ) url += "&divBrutaMin=" + $.divptr_min.value ;
	if ( $.divptr_max.value.length > 0 ) url += "&divBrutaMax=" + $.divptr_max.value ;
	
	Ti.API.info(url) ;
	
	setScreenEnable(false) ;
	
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.onload = function() {
		try {
			var papeis = JSON.parse(this.responseText);
			var data = [];
			for (var i = 0; i < papeis.length; i++) {
				var papel = papeis[i];
				
				var resultItem = Alloy.createController('resultItem', {
					papel: papel,
					nav: nav
                }).getView();
                
                data.push(resultItem);
			};
			var resultWindow = Alloy.createController('result', data).getView();
			nav.open(resultWindow) ;
			setScreenEnable(true) ;
		} catch(e) {
			alert("Error: "+ e);
			setScreenEnable(true) ;
		}
	} ;
	xhr.onerror = function(e) {
		Ti.API.info(JSON.stringify(e));
		alert("Erro de conexão: " + e) ;
	} ;
	//xhr.setRequestHeader("Content-Type", "application/json-rpc");
	xhr.open("GET", url);
	Ti.API.info("Chamando request...") ;
	xhr.send();
};

// Configura o loading
$.loading.hide() ;

// Cria navigationGroup para iOS
if ( iOS ) {
	var newWindow = Titanium.UI.createWindow();
	nav = Titanium.UI.iPhone.createNavigationGroup({
		window: $.index
	});
	newWindow.add(nav);
	newWindow.open(); 
} else {
	// Workaround para funcionar o nav.open no Android (no iOS o nav representa um NavigationGroup)
	var WindowOpener = function() {
		this.open = function(win, args) {
			if ( ! args ) {
				args = {fullscreen:true} ;
			} else {
				args.fullscreen = true ;
			}
			win.open(args) ;
		}
	}
	nav = new WindowOpener() ;
	$.index.open() ;
}