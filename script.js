// Animação de revelação ao rolar
const reveal = () => {
    const cards = document.querySelectorAll('.service-card, .order-section');
    cards.forEach(card => {
        const windowHeight = window.innerHeight;
        const elementTop = card.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
}

// Configuração inicial das animações
document.querySelectorAll('.service-card, .order-section').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
});

window.addEventListener("scroll", reveal);
window.onload = reveal;
