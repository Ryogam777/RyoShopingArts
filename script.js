// Menu responsivo
const menu = document.getElementById('menu');
const menuToggle = document.createElement('button');
menuToggle.textContent = 'Menu';
menuToggle.classList.add('menu-toggle');
menu.appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Efeito de rolagem suave
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Formulário de contato
const formContato = document.getElementById('form-contato');
formContato.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    console.log(`Nome: ${nome}, Email: ${email}, Mensagem: ${mensagem}`);
    alert('Mensagem enviada com sucesso!');
});
