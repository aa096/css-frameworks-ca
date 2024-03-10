export function getTitle (result) {
    const titleContainer = document.getElementById("title");    
    titleContainer.textContent = result.title + " | Creative Share";
}
