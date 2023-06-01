export const goToInit = () => {
	let logo = document.getElementById("logo")
	logo.addEventListener("click", function() {
		window.location.href = "/init-game"
	})
}