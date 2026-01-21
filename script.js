document.addEventListener('DOMContentLoaded', () => {
    // Revelação de elementos ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Header fixo muda de cor
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.style.backgroundColor = window.scrollY > 50 ? '#1a252f' : '#2c3e50';
    });
});
