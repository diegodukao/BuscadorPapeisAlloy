function toHumanNumber(currency) {
	var old = currency ;
	currency = parseFloat(currency.replace(/\./g, "").replace(/\,/g, ".")) ;
	var sign = 1 ;
	if( currency < 0 ) {
		currency = -currency ;
		sign = -1 ;
	} else if (currency == 0 ) {
		return "0" ;
	}
    var s = ['', 'mil', 'MI', 'BI', 'TRI', 'QUA', 'QUI'];
    var e = Math.floor(Math.log(currency) / Math.log(1000));
	//Ti.API.info("toHumanNumber: " + old + " >> " + currency + " (type = " + typeof(currency) + ") e = " + e);
    return (sign * currency / Math.pow(1000, e)).toFixed(1) + s[e];
}

var args = arguments[0] || {};
$.nome.text = args.papel.nome || '';
$.precoSobreLucro.text = args.papel.precoSobreLucro || '';
$.retornoSobrePatrimonio.text = (args.papel.retornoSobrePatrimonio || '') + "%";
$.dividaBrutaSobrePatrimonio.text = args.papel.dividaBrutaSobrePatrimonio || '';
$.patrimonioLiquido.text = "R$ " + toHumanNumber(args.papel.patrimonioLiquido);
var nav = args.nav ;

function openGraph(e) {
	Ti.API.info("Click: " + JSON.stringify(e)) ;
	var graphWindow = Alloy.createController('graph', {nomePapel: "WHRL4"}).getView();
	nav.open(graphWindow) ;
}
