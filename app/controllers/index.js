function cleanFields(e){
	$.pl_min.value = "";
	$.pl_max.value = "";
	$.roe_min.value = "";
	$.roe_max.value = "";
	$.divptr_min.value = "";
	$.divptr_max.value = "";
};

function search(e) {
	//Ti.API.log("DEBUG", "[btnBuscar.click] nav = " + self.nav)
	var xhr = Ti.Network.createHTTPClient();
	//xhr.timeout = 1000000;
	xhr.open("GET", "https://buscadorpapeis-prospeccaohtml5.rhcloud.com/buscadorpapeis/rest/papeis/buscar?plMin=0&plMax=25&roeMin=0.09&divBrutaMax=0.20");

	xhr.onload = function() {
		try {
			var papeis = JSON.parse(this.responseText);
			var data = [];
			for (var i = 0; i < papeis.length; i++) {
				var papel = papeis[i];
				
				var resultItem = Alloy.createController('resultItem', {
                    title: papel.nome + ": R$ " + papel.cotacaoAtual
                }).getView();
                
                data.push(resultItem);
			};
			
			$.view.hide();
			$.resultTable.setData(data);
			// var ResultWindow = require("ui/ResultWindow");
			// var resultWindow = new ResultWindow({
				// nav : self.nav,
				// papeis: tableData
			// });
			// self.nav.open(resultWindow, {
				// animated : true
			// });
		} catch(e) {
			alert("Error: "+ e);
		}
	}
	xhr.send();
};

$.index.open();
