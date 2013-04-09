var args = arguments[0] || {};
var nav = args.nav ;

function viewCamera(e) {
	var win = Titanium.UI.currentWindow;
 
 	Titanium.Media.showCamera({
	 
	    success:function(event)
	    {
	        var cropRect = event.cropRect;
	        var image = event.media;
	 
	        var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'camera_photo.png');
	        f.write(image);
	    },
	    cancel:function()
	    {
	 
	    },
	    error:function(error)
	    {
	        // create alert
	        var a = Titanium.UI.createAlertDialog({title:'Camera'});
	 
	        // set message
	        if (error.code == Titanium.Media.NO_CAMERA)
	        {
	            a.setMessage('Device does not have video recording capabilities');
	        }
	        else
	        {
	            a.setMessage('Unexpected error: ' + error.code);
	        }
	 
	        // show alert
	        a.show();
	    },
	    allowEditing:true
	});
};

function viewPhoto(e) {
	$.btn_verfoto.enabled = false ;
	$.btn_camera.enabled = false ;
	try {
	    var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'camera_photo.png');
	    var image = f.read();
	    Ti.UI.backgroundColor = 'white';
		var win = Ti.UI.createWindow();
		var image = Ti.UI.createImageView({
		  image:image.nativePath
		});
		win.add(image);
		nav.open(win);
	} catch(e) {
		alert("Erro ao abrir arquivo de foto") ;
	} finally {
		$.btn_verfoto.enabled = true ;
		$.btn_camera.enabled = true ;
	}
}

function listenMusic(e) {
	var player = Ti.Media.createSound({url:"/etc/music.mp3"});
	player.play();
}
