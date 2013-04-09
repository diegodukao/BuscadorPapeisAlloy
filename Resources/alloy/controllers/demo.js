function Controller() {
    function viewCamera(e) {
        var win = Titanium.UI.currentWindow;
        Titanium.Media.showCamera({
            success: function(event) {
                var cropRect = event.cropRect, image = event.media, f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "camera_photo.png");
                f.write(image);
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Device does not have video recording capabilities") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            allowEditing: !0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.demo = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "demo"
    }), "Window", null);
    $.addTopLevelView($.__views.demo);
    $.__views.view = A$(Ti.UI.createView({
        id: "view"
    }), "View", $.__views.demo);
    $.__views.demo.add($.__views.view);
    $.__views.btn_camera = A$(Ti.UI.createButton({
        width: "25%",
        left: "10%",
        top: "10%",
        title: "Câmera",
        id: "btn_camera"
    }), "Button", $.__views.view);
    $.__views.view.add($.__views.btn_camera);
    viewCamera ? $.__views.btn_camera.on("click", viewCamera) : __defers["$.__views.btn_camera!click!viewCamera"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, nav = args.nav;
    __defers["$.__views.btn_camera!click!viewCamera"] && $.__views.btn_camera.on("click", viewCamera);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;