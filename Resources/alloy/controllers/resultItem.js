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
    function openGraph(e) {
        Ti.API.info("Click: " + JSON.stringify(e));
        var graphWindow = Alloy.createController("graph", {
            nomePapel: "WHRL4"
        }).getView();
        nav.open(graphWindow);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        height: "44dip",
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.bgView = A$(Ti.UI.createView({
        id: "bgView"
    }), "View", $.__views.row);
    $.__views.row.add($.__views.bgView);
    openGraph ? $.__views.bgView.on("click", openGraph) : __defers["$.__views.bgView!click!openGraph"] = !0;
    $.__views.nome = A$(Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            "undefined": undefined
        },
        width: "25%",
        left: "1%",
        id: "nome",
        touchEnabled: "false"
    }), "Label", $.__views.bgView);
    $.__views.bgView.add($.__views.nome);
    $.__views.precoSobreLucro = A$(Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            "undefined": undefined
        },
        width: "15%",
        left: "25%",
        id: "precoSobreLucro",
        touchEnabled: "false"
    }), "Label", $.__views.bgView);
    $.__views.bgView.add($.__views.precoSobreLucro);
    $.__views.retornoSobrePatrimonio = A$(Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            "undefined": undefined
        },
        width: "20%",
        left: "40%",
        id: "retornoSobrePatrimonio",
        touchEnabled: "false"
    }), "Label", $.__views.bgView);
    $.__views.bgView.add($.__views.retornoSobrePatrimonio);
    $.__views.dividaBrutaSobrePatrimonio = A$(Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            "undefined": undefined
        },
        width: "15%",
        left: "60%",
        id: "dividaBrutaSobrePatrimonio",
        touchEnabled: "false"
    }), "Label", $.__views.bgView);
    $.__views.bgView.add($.__views.dividaBrutaSobrePatrimonio);
    $.__views.patrimonioLiquido = A$(Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            "undefined": undefined
        },
        width: "24%",
        left: "75%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        id: "patrimonioLiquido",
        touchEnabled: "false"
    }), "Label", $.__views.bgView);
    $.__views.bgView.add($.__views.patrimonioLiquido);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.nome.text = args.papel.nome || "";
    $.precoSobreLucro.text = args.papel.precoSobreLucro || "";
    $.retornoSobrePatrimonio.text = (args.papel.retornoSobrePatrimonio || "") + "%";
    $.dividaBrutaSobrePatrimonio.text = args.papel.dividaBrutaSobrePatrimonio || "";
    $.patrimonioLiquido.text = "R$ " + toHumanNumber(args.papel.patrimonioLiquido);
    var nav = args.nav;
    __defers["$.__views.bgView!click!openGraph"] && $.__views.bgView.on("click", openGraph);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;