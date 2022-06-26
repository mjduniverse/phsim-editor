var modal = document.createElement("modal");

var modalDialog = document.createElement("div");
modalDialog.className = "modal-dialog"
modal.appendChild(modalDialog);

var modalContent = document.createElement("div");
modalContent.className = "modal-content"
modalDialog.appendChild(modalContent);

var modalHeader = document.createElement("div");
modalHeader.className = "modal-header"
modalContent.appendChild(modalHeader);

var modalTitle = document.createElement("modal-title");
modalHeader.appendChild(modalTitle);