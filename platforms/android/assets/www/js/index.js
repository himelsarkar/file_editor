document.addEventListener("deviceready", init, false);
function init() {
	// var fileName = "www/index.txt"
 //    var pathName = cordova.file.applicationDirectory + fileName
	// function readFromFile(fileName) {
	   window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "test.txt", gotFile, fail)
	// }
    document.querySelector("#submit").addEventListener("touchend", writeFile(), fail)
    // readFromFile(pathName)
}

function fail(event) {
	console.log(event.code)
	console.log("Some error happened!")
}

function gotFile(fileEntry) {
	fileEntry.file(function(file) {
		var reader = new FileReader();
        reader.onloadend = function(e) {
        	document.querySelector("#textarea").innerHTML = this.result
        	console.log(this.result);
        }
        name = fileEntry.name
        reader.readAsText(file);
	});
}

function writeFile() {

	window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "test.txt", function(dirEntry) {
	  dirEntry.getFile("test.txt", {create: false}, function(file){
		file.createWriter(function(e) {
			// var content = document.querySelector('#textarea').innerHTML
			var content = "Well, fuck you!"
            var bb = new Blob([content], {type: 'text/plain'})
            fileWriter.write(bb);
		});
	})
}, fail)
}



