var keys = ['form-id', 'name-id', 'name-value', 'password-id', 'password-value', 'captcha-pic-id', 'captcha-field-id'];

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log('background: fetching');
		if (request.action == 'fetchData') {
			var data = {};
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var value = localStorage.getItem(key);
				data[key] = value;
			};
			data['is-auto'] = localStorage.getItem('is-auto');

			sendResponse(data);
		}
 	});