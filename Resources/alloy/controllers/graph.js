function Controller() {
    function doneLoading(e) {
        var url = "http://buscadorgraficos-prospeccaohtml5.rhcloud.com/buscadorgraficos/rest/papeis/buscar?dataInicial=01/20/2010&dataFinal=01/02/2013&nomePapel=" + nomePapel, xhr = Ti.Network.createHTTPClient();
        Ti.API.info(url);
        xhr.onload = function() {
            $.loading.hide();
            try {
                $.webview.evalJS("loadData(" + this.responseText + ")");
                $.loading.hide();
            } catch (e) {
                alert("Erro ao atualizar dados do gráfico: " + e);
                nav.close($);
            }
        };
        xhr.onerror = function(e) {
            alert("Erro de conexão: " + this.status);
            nav.close($.window);
        };
        xhr.open("GET", url);
        Ti.API.info("Chamando request...");
        xhr.send();
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
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        top: "50%",
        left: "50%",
        id: "loading"
    }), "ActivityIndicator", $.__views.graph);
    $.__views.graph.add($.__views.loading);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0], nomePapel = args.nomePapel;
    $.loading.show();
    $.webview.url = "/etc/graph.html";
    __defers["$.__views.webview!load!doneLoading"] && $.__views.webview.on("load", doneLoading);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;