function Controller() {
    function doneLoading(e) {
        $.loading.message = "Carregando URL...";
        var url = "http://buscadorgraficos-prospeccaohtml5.rhcloud.com/buscadorgraficos/rest/papeis/buscar?dataInicial=01/20/2010&dataFinal=01/02/2013&nomePapel=" + nomePapel, xhr = Ti.Network.createHTTPClient();
        Ti.API.info(url);
        xhr.onload = function() {
            try {
                $.loading.message = "Carregando Gráfico...";
                $.webview.evalJS("loadData(" + this.responseText + ")");
                $.loading.message = "Plotando Gráfico...";
            } catch (e) {
                alert("Erro ao atualizar dados do gráfico: " + e);
                nav.close($);
            }
        };
        xhr.onerror = function(e) {
            alert("Erro de conexão: " + this.status);
            $.loading.hide();
        };
        xhr.open("GET", url);
        Ti.API.info("Chamando request...");
        xhr.send();
    }
    function chartLoaded(e) {
        Ti.App.removeEventListener("app:chartLoaded", chartLoaded);
        $.loading.hide();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.graph = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "graph"
    }), "Window", null);
    $.addTopLevelView($.__views.graph);
    $.__views.webview = A$(Ti.UI.createWebView({
        id: "webview"
    }), "WebView", $.__views.graph);
    $.__views.graph.add($.__views.webview);
    doneLoading ? $.__views.webview.on("load", doneLoading) : __defers["$.__views.webview!load!doneLoading"] = !0;
    $.__views.loading = A$(Ti.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        top: "50%",
        left: "10%",
        id: "loading",
        message: "Carregando..."
    }), "ActivityIndicator", $.__views.graph);
    $.__views.graph.add($.__views.loading);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("app:chartLoaded", chartLoaded);
    var args = arguments[0], nomePapel = args.nomePapel;
    $.loading.show();
    $.loading.message = "Carregando HTML...";
    $.webview.url = "/etc/graph.html";
    __defers["$.__views.webview!load!doneLoading"] && $.__views.webview.on("load", doneLoading);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;