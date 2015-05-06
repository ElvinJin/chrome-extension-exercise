var keys = ['form-id', 'name-id', 'name-value', 'password-id', 'password-value', 'captcha-pic-id', 'captcha-field-id'];

function save() {
	console.log('saving data');

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var value = $('#' + key).val();
		localStorage.setItem(key, value);
	};

	localStorage.setItem('is-auto', $("input:checked").length);
}

function showSavedData() {
	console.log('fetching saved data');

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var value = localStorage.getItem(key);
		$('#' + key).val(value);
	};

	var checked = localStorage.getItem('is-auto');
	if (checked == 1) $('#is-auto').prop('checked', true);
	else $('#is-auto').prop('checked', false);
}

function fill() {
	var data = {};
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var value = $('#' + key).val();
		data[key] = value;
	};
	data['is-auto'] = $("input:checked").length;
	data.action = 'fill';

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, data, function(response) {
			if (response.result == 'succeed') $('#msg').html('Save & fill successfully');
			else $('#msg').html('Save & fill failed');

		});
	});
}

function saveClicked() {
	save();
	$('#msg').html('Saved successfully');
}

function saveAndFillClicked() {
	save();
	fill();
}

window.onload = function () {
	$('#saveBtn').click(saveClicked);
	$('#saveAndFillBtn').click(saveAndFillClicked);
	showSavedData();
}