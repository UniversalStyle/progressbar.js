(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		factory();
	} else {
		root.ProgressBar = factory();
	}
})(this, function () {

	let PageHeight = null;
	let DisplayedHeight = null;
	let ProgressBar = null;
	const ProgressBarTemplate =
		'<div class="progressbar">' +
			'<div class="progressbar-line"></div>' +
		'</div>';

	// fill progress bar
	function FillProgressBar() {
		PageHeight = document.body.scrollHeight;
		DisplayedHeight = window.innerHeight;
		ProgressBar.style.width = (window.scrollY * 100 / (PageHeight - DisplayedHeight)) + '%';
	}

	// add progressbar to end of html
	const AddProgressBar = function () {
		document.body.innerHTML += ProgressBarTemplate;
		Init();
	};


	// start point
	const Init = function () {
		ProgressBar = document.querySelector('.progressbar-line');

		if (!ProgressBar) {
			console.error('Progress Bar element not found. Add progress bar to html or use addProgressBar function.');
			return;
		}

		// add event handlers for scroll and resize
		window.addEventListener('scroll', FillProgressBar);
		window.addEventListener('resize', FillProgressBar);
	};

	return {
		init: Init,
		addProgressBar: AddProgressBar
	};
});