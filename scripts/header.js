function configurarModalLogin() {
    const perfilBtn = document.querySelector(".perfilIcone");
    const modal = document.getElementById("login-modal");
    const fecharModal = document.getElementById("fechar-login-modal");

    if (!perfilBtn || !modal || !fecharModal) {
        return;
    }
    perfilBtn.addEventListener("click", (event) => {
        modal.classList.add("ativo");
        modal.setAttribute("aria-hidden", "false");
    });
    fecharModal.addEventListener("click", () => {
        modal.classList.remove("ativo");
        modal.setAttribute("aria-hidden", "true");
    });
}

window.onload = () => {
    configurarModalLogin();
};