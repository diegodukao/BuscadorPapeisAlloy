function Controller() {
    function cleanFields(e) {
        $.pl_min.value = "";
        $.pl_max.value = "";
        $.roe_min.value = "";
        $.roe_max.value = "";
        $.divptr_min.value = "";
        $.divptr_max.value = "";
    }
    function search(e) {
        var xhr = Ti.Network.createHTTPClient();
        xhr.open("GET", "https://buscadorpapeis-prospeccaohtml5.rhcloud.com/buscadorpapeis/rest/papeis/buscar?plMin=0&plMax=25&roeMin=0.09&divBrutaMax=0.20");
        xhr.onload = function() {
            try {
                var papeis = JSON.parse(this.responseText), data = [];
                for (var i = 0; i < papeis.length; i++) {
                    var papel = papeis[i], resultItem = Alloy.createController("resultItem", {
                        title: papel.nome + ": R$ " + papel.cotacaoAtual
                    }).getView();
                    data.push(resultItem);
                }
                var resultWindow = Alloy.createController("result", data).getView();
                resultWindow.open();
            } catch (e) {
                alert("Error: " + e);
            }
        };
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.addTopLevelView($.__views.index);
    $.__views.view = Ti.UI.createView({
        id: "view"
    });
    $.__views.index.add($.__views.view);
    $.__views.label_min = Ti.UI.createLabel({
        top: "1%",
        left: "35%",
        color: "black",
        text: "Min",
        id: "label_min"
    });
    $.__views.view.add($.__views.label_min);
    $.__views.label_max = Ti.UI.createLabel({
        top: "1%",
        left: "73%",
        color: "black",
        text: "Max",
        id: "label_max"
    });
    $.__views.view.add($.__views.label_max);
    $.__views.label_pl = Ti.UI.createLabel({
        top: "11%",
        left: "5%",
        color: "black",
        text: "P/L",
        id: "label_pl"
    });
    $.__views.view.add($.__views.label_pl);
    $.__views.label_roe = Ti.UI.createLabel({
        top: "21%",
        left: "5%",
        color: "black",
        text: "ROE",
        id: "label_roe"
    });
    $.__views.view.add($.__views.label_roe);
    $.__views.label_divptr = Ti.UI.createLabel({
        top: "31%",
        left: "5%",
        color: "black",
        text: "ROE",
        id: "label_divptr"
    });
    $.__views.view.add($.__views.label_divptr);
    $.__views.pl_min = Ti.UI.createTextField({
        color: "black",
        top: "7%",
        left: "25%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        id: "pl_min"
    });
    $.__views.view.add($.__views.pl_min);
    $.__views.pl_max = Ti.UI.createTextField({
        color: "black",
        top: "7%",
        left: "63%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        id: "pl_max"
    });
    $.__views.view.add($.__views.pl_max);
    $.__views.roe_min = Ti.UI.createTextField({
        color: "black",
        top: "17%",
        left: "25%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        id: "roe_min"
    });
    $.__views.view.add($.__views.roe_min);
    $.__views.roe_max = Ti.UI.createTextField({
        color: "black",
        top: "17%",
        left: "63%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        id: "roe_max"
    });
    $.__views.view.add($.__views.roe_max);
    $.__views.divptr_min = Ti.UI.createTextField({
        color: "black",
        top: "27%",
        left: "25%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        id: "divptr_min"
    });
    $.__views.view.add($.__views.divptr_min);
    $.__views.divptr_max = Ti.UI.createTextField({
        color: "black",
        top: "27%",
        left: "63%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        id: "divptr_max"
    });
    $.__views.view.add($.__views.divptr_max);
    $.__views.btn_limpar = Ti.UI.createButton({
        title: "Limpar",
        top: "37%",
        left: "7%",
        width: "23%",
        id: "btn_limpar"
    });
    $.__views.view.add($.__views.btn_limpar);
    cleanFields ? $.__views.btn_limpar.addEventListener("click", cleanFields) : __defers["$.__views.btn_limpar!click!cleanFields"] = !0;
    $.__views.btn_buscar = Ti.UI.createButton({
        top: "37%",
        left: "70%",
        width: "23%",
        title: "Buscar",
        id: "btn_buscar"
    });
    $.__views.view.add($.__views.btn_buscar);
    search ? $.__views.btn_buscar.addEventListener("click", search) : __defers["$.__views.btn_buscar!click!search"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    __defers["$.__views.btn_limpar!click!cleanFields"] && $.__views.btn_limpar.addEventListener("click", cleanFields);
    __defers["$.__views.btn_buscar!click!search"] && $.__views.btn_buscar.addEventListener("click", search);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;