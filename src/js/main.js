document.addEventListener('DOMContentLoaded', function () {
	const tabs = document.querySelectorAll('.tab');
	const tabButtons = document.querySelectorAll('.tabs__button');

	tabButtons.forEach(button => {
		button.addEventListener('click', function () {
			// Remove active class from all buttons and tabs
			tabButtons.forEach(btn => {
				btn.classList.remove('active');
				btn.setAttribute('aria-selected', 'false');
			});
			tabs.forEach(tab => tab.classList.remove('active'));

			// Add active class to the clicked button and corresponding tab
			button.classList.add('active');
			button.setAttribute('aria-selected', 'true');
			const tabId = button.getAttribute('data-tab');
			document.getElementById(tabId).classList.add('active');
		});
	});
});
