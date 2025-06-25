document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const sendButton = document.getElementById("knopka");

    sendButton.addEventListener("click", (event) => {
        event.preventDefault();

        const name = form.elements["name"].value.trim();
        const email = form.elements["email"].value.trim();
        const message = form.elements["message"].value.trim();
        const errors = [];

        if (!name) {
            errors.push("Пожалуйста, введите имя.");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.push("Пожалуйста, введите корректный e-mail.");
        }

        if (!message) {
            errors.push("Пожалуйста, введите сообщение.");
        }

        if (errors.length) {
            alert(errors.join("\n"));
        } else {
            alert("Спасибо! Ваше сообщение отправлено.");
            form.reset();
        }
    });
});

