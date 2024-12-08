
document.addEventListener("DOMContentLoaded", () => {
    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");
    const editSection = document.getElementById("edit-section");
    const editName = document.getElementById("edit-name");
    const editEmail = document.getElementById("edit-email");
    const historyList = document.getElementById("history-list");

    fetch("user_data.json")
        .then(response => response.json())
        .then(data => {
            userName.textContent = data.name;
            userEmail.textContent = data.email;
            historyList.innerHTML = "";
            data.history.forEach(entry => {
                const listItem = document.createElement("li");
                listItem.textContent = `${entry.action} em ${new Date(entry.timestamp).toLocaleString()}`;
                historyList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Erro ao carregar os dados do usuário:", error));

    document.getElementById("edit-profile").addEventListener("click", () => {
        editSection.style.display = "block";
        editName.value = userName.textContent;
        editEmail.value = userEmail.textContent;
    });

    document.getElementById("save-profile").addEventListener("click", () => {
        userName.textContent = editName.value;
        userEmail.textContent = editEmail.value;
        editSection.style.display = "none";
    });

    document.getElementById("change-image").addEventListener("click", () => {
        document.getElementById("upload-image").click();
    });

    document.getElementById("upload-image").addEventListener("change", (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById("profile-pic").src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    document.getElementById("toggle-theme").addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });
});
