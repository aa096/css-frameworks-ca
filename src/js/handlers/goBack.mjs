export function setupGoBack() {
    const goBackButton = document.querySelector("#goBack");

    if (goBackButton) {
        goBackButton.addEventListener("click", goBack);
    }

    function goBack() {
        window.history.back();
    }
}
