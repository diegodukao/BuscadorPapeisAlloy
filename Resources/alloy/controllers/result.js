function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.resultWin = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: "false",
        navBarHidden: !1,
        id: "resultWin"
    }), "Window", null);
    $.addTopLevelView($.__views.resultWin);
    $.__views.resultTable = A$(Ti.UI.createTableView({
        top: "30px",
        id: "resultTable"
    }), "TableView", $.__views.resultWin);
    $.__views.resultWin.add($.__views.resultTable);
    $.__views.header = A$(Ti.UI.createView({
        top: "0",
        height: "30px",
        backgroundColor: "gray",
        id: "header"
    }), "View", $.__views.resultWin);
    $.__views.resultWin.add($.__views.header);
    $.__views.nome = A$(Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            "undefined": undefined
        },
        width: "25%",
        left: "1%",
        color: "black",
        text: "Papel",
        id: "nome"
    }), "Label", $.__views.header);
    $.__views.header.add($.__views.nome);
    $.__views.precoSobreLucro = A$(Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            "undefined": undefined
        },
        width: "15%",
        left: "25%",
        color: "black",
        text: "P/L",
        id: "precoSobreLucro"
    }), "Label", $.__views.header);
    $.__views.header.add($.__views.precoSobreLucro);
    $.__views.retornoSobrePatrimonio = A$(Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            "undefined": undefined
        },
        width: "20%",
        left: "40%",
        color: "black",
        text: "ROE",
        id: "retornoSobrePatrimonio"
    }), "Label", $.__views.header);
    $.__views.header.add($.__views.retornoSobrePatrimonio);
    $.__views.dividaBrutaSobrePatrimonio = A$(Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            "undefined": undefined
        },
        width: "15%",
        left: "60%",
        color: "black",
        text: "Div/Ptr",
        id: "dividaBrutaSobrePatrimonio"
    }), "Label", $.__views.header);
    $.__views.header.add($.__views.dividaBrutaSobrePatrimonio);
    $.__views.patrimonioLiquido = A$(Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            "undefined": undefined
        },
        width: "24%",
        left: "75%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Patr.",
        id: "patrimonioLiquido"
    }), "Label", $.__views.header);
    $.__views.header.add($.__views.patrimonioLiquido);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var data = arguments[0];
    $.resultTable.setData(data);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;