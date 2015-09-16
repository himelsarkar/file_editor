document.addEventListener("deviceready", init, false);
var obj

function init() {
	// var fileName = "www/index.txt"
 //    var pathName = cordova.file.applicationDirectory + fileName
	// function readFromFile(fileName) {
	   window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "test.txt", gotFile, fail)
	// }
    document.getElementById("submit").addEventListener("click", writeFile)
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
        	console.log(this.result);
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
			console.log(content)
            var bb = new Blob([content], {type: 'text/plain'})
            e.write(bb);
		});
	  })
    }, fail)
    init();
    document.getElementById("confirmation").innerHTML = "You have just saved this file!";
    document.getElementById("cancel").innerHTML = "Back"
}



