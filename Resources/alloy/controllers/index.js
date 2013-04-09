function Controller() {
    function cleanFields(e) {
        $.pl_min.value = "";
        $.pl_max.value = "";
        $.roe_min.value = "";
        $.roe_max.value = "";
        $.divptr_min.value = "";
        $.divptr_max.value = "";
    }
    function setScreenEnable(enable) {
        $.pl_min.enabled = enable;
        $.pl_max.enabled = enable;
        $.roe_min.enabled = enable;
        $.roe_max.enabled = enable;
        $.divptr_min.enabled = enable;
        $.divptr_max.enabled = enable;
        $.btn_limpar.enabled = enable;
        $.btn_buscar.enabled = enable;
        enable ? $.loading.hide() : $.loading.show();
    }
    function dismissKeyboard(e) {
        this.blur();
    }
    function isNumber(n) {
        return n.length == 0 || !isNaN(parseFloat(n)) && isFinite(n);
    }
    function validateNumber(e) {
        Ti.API.info("validateNumber: " + e.value);
        isNumber(e.value) ? e.source.color = "black" : e.source.color = "red";
    }
    function search(e) {
        if (!isNumber($.pl_min.value) || !isNumber($.pl_max.value) || !isNumber($.roe_min.value) || !isNumber($.roe_max.value) || !isNumber($.divptr_min.value) || !isNumber($.divptr_max.value)) {
            alert("Digite um número válido nos campos marcados.");
            return;
        }
        var url = "https://buscadorpapeis-prospeccaohtml5.rhcloud.com/buscadorpapeis/rest/papeis/buscar?";
        $.pl_min.value.length > 0 && (url += "&plMin=" + $.pl_min.value);
        $.pl_max.value.length > 0 && (url += "&plMax=" + $.pl_max.value);
        $.roe_min.value.length > 0 && (url += "&roeMin=" + $.roe_min.value / 100);
        $.roe_max.value.length > 0 && (url += "&roeMax=" + $.roe_max.value / 100);
        $.divptr_min.value.length > 0 && (url += "&divBrutaMin=" + $.divptr_min.value);
        $.divptr_max.value.length > 0 && (url += "&divBrutaMax=" + $.divptr_max.value);
        Ti.API.info(url);
        setScreenEnable(!1);
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            try {
                var papeis = JSON.parse(this.responseText), data = [];
                for (var i = 0; i < papeis.length; i++) {
                    var papel = papeis[i], resultItem = Alloy.createController("resultItem", {
                        papel: papel,
                        nav: nav
                    }).getView();
                    data.push(resultItem);
                }
                var resultWindow = Alloy.createController("result", data).getView();
                nav.open(resultWindow);
                setScreenEnable(!0);
            } catch (e) {
                alert("Error: " + e);
                setScreenEnable(!0);
            }
        };
        xhr.onerror = function(e) {
            Ti.API.info(JSON.stringify(e));
            alert("Erro de conexão: " + e);
        };
        xhr.open("GET", url);
        Ti.API.info("Chamando request...");
        xhr.send();
    }
    function demo(e) {
        var demoWindow = Alloy.createController("demo", {
            nav: nav
        }).getView();
        nav.open(demoWindow);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.view = A$(Ti.UI.createView({
        id: "view"
    }), "View", $.__views.index);
    $.__views.index.add($.__views.view);
    $.__views.label_min = A$(Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "10pt"
        },
        top: "1%",
        left: "35%",
        text: "Min",
        id: "label_min"
    }), "Label", $.__views.view);
    $.__views.view.add($.__views.label_min);
    $.__views.label_max = A$(Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "10pt"
        },
        top: "1%",
        left: "73%",
        text: "Max",
        id: "label_max"
    }), "Label", $.__views.view);
    $.__views.view.add($.__views.label_max);
    $.__views.label_pl = A$(Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "10pt"
        },
        top: "8%",
        left: "5%",
        text: "P/L",
        id: "label_pl"
    }), "Label", $.__views.view);
    $.__views.view.add($.__views.label_pl);
    $.__views.label_roe = A$(Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "10pt"
        },
        top: "18%",
        left: "5%",
        text: "ROE",
        id: "label_roe"
    }), "Label", $.__views.view);
    $.__views.view.add($.__views.label_roe);
    $.__views.label_divptr = A$(Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "10pt"
        },
        top: "28%",
        left: "5%",
        text: "Div/Ptr",
        id: "label_divptr"
    }), "Label", $.__views.view);
    $.__views.view.add($.__views.label_divptr);
    $.__views.pl_min = A$(Ti.UI.createTextField({
        color: "black",
        top: "7%",
        left: "25%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "pl_min"
    }), "TextField", $.__views.view);
    $.__views.view.add($.__views.pl_min);
    dismissKeyboard ? $.__views.pl_min.on("enter", dismissKeyboard) : __defers["$.__views.pl_min!enter!dismissKeyboard"] = !0;
    validateNumber ? $.__views.pl_min.on("change", validateNumber) : __defers["$.__views.pl_min!change!validateNumber"] = !0;
    $.__views.pl_max = A$(Ti.UI.createTextField({
        color: "black",
        top: "7%",
        left: "63%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "pl_max"
    }), "TextField", $.__views.view);
    $.__views.view.add($.__views.pl_max);
    dismissKeyboard ? $.__views.pl_max.on("enter", dismissKeyboard) : __defers["$.__views.pl_max!enter!dismissKeyboard"] = !0;
    validateNumber ? $.__views.pl_max.on("change", validateNumber) : __defers["$.__views.pl_max!change!validateNumber"] = !0;
    $.__views.roe_min = A$(Ti.UI.createTextField({
        color: "black",
        top: "17%",
        left: "25%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "roe_min"
    }), "TextField", $.__views.view);
    $.__views.view.add($.__views.roe_min);
    dismissKeyboard ? $.__views.roe_min.on("enter", dismissKeyboard) : __defers["$.__views.roe_min!enter!dismissKeyboard"] = !0;
    validateNumber ? $.__views.roe_min.on("change", validateNumber) : __defers["$.__views.roe_min!change!validateNumber"] = !0;
    $.__views.roe_max = A$(Ti.UI.createTextField({
        color: "black",
        top: "17%",
        left: "63%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "roe_max"
    }), "TextField", $.__views.view);
    $.__views.view.add($.__views.roe_max);
    dismissKeyboard ? $.__views.roe_max.on("enter", dismissKeyboard) : __defers["$.__views.roe_max!enter!dismissKeyboard"] = !0;
    validateNumber ? $.__views.roe_max.on("change", validateNumber) : __defers["$.__views.roe_max!change!validateNumber"] = !0;
    $.__views.divptr_min = A$(Ti.UI.createTextField({
        color: "black",
        top: "27%",
        left: "25%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "divptr_min"
    }), "TextField", $.__views.view);
    $.__views.view.add($.__views.divptr_min);
    dismissKeyboard ? $.__views.divptr_min.on("enter", dismissKeyboard) : __defers["$.__views.divptr_min!enter!dismissKeyboard"] = !0;
    validateNumber ? $.__views.divptr_min.on("change", validateNumber) : __defers["$.__views.divptr_min!change!validateNumber"] = !0;
    $.__views.divptr_max = A$(Ti.UI.createTextField({
        color: "black",
        top: "27%",
        left: "63%",
        width: "30%",
        height: "auto",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "divptr_max"
    }), "TextField", $.__views.view);
    $.__views.view.add($.__views.divptr_max);
    dismissKeyboard ? $.__views.divptr_max.on("enter", dismissKeyboard) : __defers["$.__views.divptr_max!enter!dismissKeyboard"] = !0;
    validateNumber ? $.__views.divptr_max.on("change", validateNumber) : __defers["$.__views.divptr_max!change!validateNumber"] = !0;
    $.__views.btn_limpar = A$(Ti.UI.createButton({
        title: "Limpar",
        top: "37%",
        left: "7%",
        width: "23%",
        id: "btn_limpar"
    }), "Button", $.__views.view);
    $.__views.view.add($.__views.btn_limpar);
    cleanFields ? $.__views.btn_limpar.on("click", cleanFields) : __defers["$.__views.btn_limpar!click!cleanFields"] = !0;
    $.__views.btn_buscar = A$(Ti.UI.createButton({
        top: "37%",
        left: "70%",
        width: "23%",
        title: "Buscar",
        id: "btn_buscar"
    }), "Button", $.__views.view);
    $.__views.view.add($.__views.btn_buscar);
    search ? $.__views.btn_buscar.on("click", search) : __defers["$.__views.btn_buscar!click!search"] = !0;
    $.__views.btn_demo = A$(Ti.UI.createButton({
        top: "70%",
        left: "70%",
        width: "23%",
        title: "Demo",
        id: "btn_demo"
    }), "Button", $.__views.view);
    $.__views.view.add($.__views.btn_demo);
    demo ? $.__views.btn_demo.on("click", demo) : __defers["$.__views.btn_demo!click!demo"] = !0;
    $.__views.loading = A$(Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        top: "50%",
        left: "50%",
        id: "loading"
    }), "ActivityIndicator", $.__views.view);
    $.__views.view.add($.__views.loading);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var iOS = !1, nav;
    $.loading.hide();
    if (iOS) {
        var newWindow = Titanium.UI.createWindow();
        nav = Titanium.UI.iPhone.createNavigationGroup({
            window: $.index
        });
        newWindow.add(nav);
        newWindow.open();
    } else {
        var WindowOpener = function() {
            this.open = function(win, args) {
                args ? args.navBarHidden = !1 : args = {
                    navBarHidden: !1
                };
                win.open(args);
            };
        };
        nav = new WindowOpener;
        $.index.open();
    }
    __defers["$.__views.pl_min!enter!dismissKeyboard"] && $.__views.pl_min.on("enter", dismissKeyboard);
    __defers["$.__views.pl_min!change!validateNumber"] && $.__views.pl_min.on("change", validateNumber);
    __defers["$.__views.pl_max!enter!dismissKeyboard"] && $.__views.pl_max.on("enter", dismissKeyboard);
    __defers["$.__views.pl_max!change!validateNumber"] && $.__views.pl_max.on("change", validateNumber);
    __defers["$.__views.roe_min!enter!dismissKeyboard"] && $.__views.roe_min.on("enter", dismissKeyboard);
    __defers["$.__views.roe_min!change!validateNumber"] && $.__views.roe_min.on("change", validateNumber);
    __defers["$.__views.roe_max!enter!dismissKeyboard"] && $.__views.roe_max.on("enter", dismissKeyboard);
    __defers["$.__views.roe_max!change!validateNumber"] && $.__views.roe_max.on("change", validateNumber);
    __defers["$.__views.divptr_min!enter!dismissKeyboard"] && $.__views.divptr_min.on("enter", dismissKeyboard);
    __defers["$.__views.divptr_min!change!validateNumber"] && $.__views.divptr_min.on("change", validateNumber);
    __defers["$.__views.divptr_max!enter!dismissKeyboard"] && $.__views.divptr_max.on("enter", dismissKeyboard);
    __defers["$.__views.divptr_max!change!validateNumber"] && $.__views.divptr_max.on("change", validateNumber);
    __defers["$.__views.btn_limpar!click!cleanFields"] && $.__views.btn_limpar.on("click", cleanFields);
    __defers["$.__views.btn_buscar!click!search"] && $.__views.btn_buscar.on("click", search);
    __defers["$.__views.btn_demo!click!demo"] && $.__views.btn_demo.on("click", demo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;