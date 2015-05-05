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
	
}

function saveAndFill() {
	save();
	fill();
}

window.onload = function () {
	$('#saveBtn').click(save);
	$('#saveAndFillBtn').click(saveAndFill);
	showSavedData();
}