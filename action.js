var keys = ['form-id', 'name-id', 'name-value', 'password-id', 'password-value', 'captcha-pic-id', 'captcha-field-id'];
var ids = ['form-id', 'name-id', 'password-id', 'captcha-pic-id', 'captcha-field-id'];

var haveMessage = 0; // 0 for no message, -1 for fail, 1 for succeed

window.onload = function() {
	if ($('.alert-danger').length != 0)
		haveMessage = -1;
	else if ($('.alert-success').length != 0)
		haveMessage = 1;

	if (haveMessage != 1) {
		chrome.runtime.sendMessage({action: 'fetchData'}, function(response) {
			var result = fillForm(response);

			if (haveMessage == -1) window.alert('You login attempt failed');
		});
	};

	chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log('action: will fill');
		if (request.action == 'fill') {
			var result = fillForm(request);
			if (result == -1) sendResponse({result:'fail'});
			else sendResponse({result:'succeed'});
		}
 	});
}

function fillForm (data) {
	for (var i = keys.length - 1; i >= 0; i--) {
		if (!data[keys[i]]) return -1;
	};

	for (var i = ids.length - 1; i >= 0; i--) {
		// try block is to handling illegal user input for ID
		try {
			if ($('#' + data[ids[i]]).length == 0) return -1;
		} catch (e) {
			return -1;
		}
	};

	$('#' + data['name-id']).val(data['name-value']);
	$('#' + data['password-id']).val(data['password-value']);

	var captchaPic = document.getElementById(data['captcha-pic-id']);
	if (captchaPic) {
		var image = new Image();
		image.src = captchaPic.src;
		var canvas = document.createElement('canvas'); 
		canvas.height = image.height;
		canvas.width = image.width;
		var imgDraw = canvas.getContext('2d'); 
		imgDraw.drawImage(image,0,0);
		var string = OCRAD(imgDraw);
		$('#' + data['captcha-field-id']).val(string);
	};

	if (haveMessage == 0 && data['is-auto'] == 1) autoSubmit(data['form-id']);
	return data['is-auto'];
}

function autoSubmit(formID) {
	$('form#' + formID).submit();
}