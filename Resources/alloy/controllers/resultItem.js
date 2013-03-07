function Controller() {
    function toHumanNumber(currency) {
        var old = currency;
        currency = parseFloat(currency.replace(/\./g, "").replace(/\,/g, "."));
        var sign = 1;
        if (currency < 0) {
            currency = -currency;
            sign = -1;
        } else if (currency == 0) return "0";
        var s = [ "", "mil", "MI", "BI", "TRI", "QUA", "QUI" ], e = Math.floor(Math.log(currency) / Math.log(1000));
        return (sign * currency / Math.pow(1000, e)).toFixed(1) + s[e];
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.nome = A$(Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            "undefined": undefined
        },
        width: "25%",
        left: "0%",
        id: "nome"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.nome);
    $.__views.precoSobreLucro = A$(Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            "undefined": undefined
        },
        width: "15%",
        left: "25%",
        id: "precoSobreLucro"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.precoSobreLucro);
    $.__views.retornoSobrePatrimonio = A$(Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            "undefined": undefined
        },
        width: "20%",
        left: "40%",
        id: "retornoSobrePatrimonio"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.retornoSobrePatrimonio);
    $.__views.dividaBrutaSobrePatrimonio = A$(Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            "undefined": undefined
        },
        width: "15%",
        left: "60%",
        id: "dividaBrutaSobrePatrimonio"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.dividaBrutaSobrePatrimonio);
    $.__views.patrimonioLiquido = A$(Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            "undefined": undefined
        },
        width: "25%",
        left: "75%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        id: "patrimonioLiquido"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.patrimonioLiquido);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.nome.text = args.papel.nome || "";
    $.precoSobreLucro.text = args.papel.precoSobreLucro || "";
    $.retornoSobrePatrimonio.text = (args.papel.retornoSobrePatrimonio || "") + "%";
    $.dividaBrutaSobrePatrimonio.text = args.papel.dividaBrutaSobrePatrimonio || "";
    $.patrimonioLiquido.text = "R$ " + toHumanNumber(args.papel.patrimonioLiquido);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;