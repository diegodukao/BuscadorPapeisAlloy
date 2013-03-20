function Controller() {
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.webview.setHtml("<html><body>Teste<b>HTML</b>.</body></html>");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;