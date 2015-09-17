document.addEventListener("deviceready", init, false);

function init() {
	window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "test.txt", gotFile, fail)
	document.getElementById("submit").addEventListener("click", writeFile)
	document.addEventListener("backbutton", onBackKey, false)
}
 
var counter = 0
function onBackKey() {
	counter = counter +1 
	if ( counter === 2 ) {
		onConfirm();
	} else {
		return
	}

	console.log("ghanti baja re!")
}

function onConfirm() {
	counter = 0
    navigator.app.exitApp();
}

function fail(event) {
	console.log(event.code)
	console.log("Some error happened!")
}


function gotFile(fileEntry) {
    console.log(fileEntry.isFile)
    console.log(fileEntry.name)
	obj = fileEntry
	fileEntry.file(function(file) {
		var reader = new FileReader();
        reader.onloadend = function(e) {
        	document.querySelector("#textarea").innerHTML = this.result
        	initial = this.result       	
        }
        name = fileEntry.name
        reader.readAsText(file);
	});
}


function writeFile() {
	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
	  console.log("got main dir" + dirEntry.isDirectory)
	  console.log(dirEntry.name)
	  dirEntry.getFile("test.txt", {create: false}, function(file){
		file.createWriter(function(e) {
			var content = document.querySelector('#textarea').value
			if (content === initial) {
				document.getElementById("confirmation").innerHTML = "You haven't made any changes!"
				return
			} else {
			    var bb = new Blob([content], {type: 'text/plain'})
                e.write(bb);
                document.getElementById("confirmation").innerHTML = "You have just saved this file!";
                document.getElementById("cancel").innerHTML = "Back"
			}
		});
	  })
    }, fail)
    init();  
}



