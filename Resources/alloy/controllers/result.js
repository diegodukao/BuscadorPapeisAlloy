function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.resultWin = Ti.UI.createWindow({
        backgroundColor: "white",
        color: "black",
        exitOnClose: "false",
        navBarHidden: !1,
        id: "resultWin"
    });
    $.addTopLevelView($.__views.resultWin);
    $.__views.resultTable = Ti.UI.createTableView({
        id: "resultTable"
    });
    $.__views.resultWin.add($.__views.resultTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var data = arguments[0];
    $.resultTable.setData(data);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;