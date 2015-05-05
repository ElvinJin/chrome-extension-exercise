var keys = ['form-id', 'name-id', 'name-value', 'password-id', 'password-value', 'captcha-pic-id', 'captcha-field-id'];

window.onload = function() {
	chrome.runtime.sendMessage({action: 'fetchData'}, function(response) {
		fillForm(response);
	});

	chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log('action: will fill');
		if (request.action == 'fill') {
			fillForm(request);
		}
 	});
}

function fillForm (data) {
	$('#' + data['name-id']).val(data['name-value']);
	$('#' + data['password-id']).val(data['password-value']);

	var image = new Image();
	image.src = document.getElementById(data['captcha-pic-id']).src;
	var canvas = document.createElement('canvas'); 
	canvas.height = image.height;
	canvas.width = image.width;
	var imgDraw = canvas.getContext('2d'); 
	imgDraw.drawImage(image,0,0);
	var string = OCRAD(imgDraw);
	$('#' + data['captcha-field-id']).val(string);
}