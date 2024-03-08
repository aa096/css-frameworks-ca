export function showErrorModal(errorMessage) {
    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    const errorModalBody = document.getElementById("errorModalBody");
  
    errorModalBody.textContent = errorMessage;
  
    errorModal.show();
  }