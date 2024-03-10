export function showLoadingIndicator() {
    const loaderDiv = document.createElement("div");
    loaderDiv.classList.add("loader-div");

    const spinner = document.createElement("div");
    spinner.classList.add("loader");

    document.body.appendChild(loaderDiv);
    loaderDiv.appendChild(spinner);
}

export function hideLoadingIndicator() {
    const loaderDiv = document.querySelector(".loader-div");
    if (loaderDiv) {
        document.body.removeChild(loaderDiv);
    }
}