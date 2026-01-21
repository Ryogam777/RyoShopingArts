// 1. Banco de Dados de Produtos (Organizado por número de imagem)
const produtos = [
    { id: 1, nome: "Boneco de Gesso A", preco: 45.00, img: "img/1.jpg", cat: "Gesso" },
    { id: 2, nome: "Flor de EVA Luxo", preco: 25.50, img: "img/2.jpg", cat: "EVA" },
    { id: 3, nome: "Decoração de Parede", preco: 89.90, img: "img/3.jpg", cat: "Decoração" },
    { id: 4, nome: "Boneco de Gesso B", preco: 50.00, img: "img/4.jpg", cat: "Gesso" },
    { id: 5, nome: "Vaso de Flores EVA", preco: 35.00, img: "img/5.jpg", cat: "EVA" },
    { id: 6, nome: "Quadro Artesanal", preco: 120.00, img: "img/6.jpg", cat: "Decoração" }
];

let carrinho = JSON.parse(localStorage.getItem('ryo_cart')) || [];

// 2. Renderizar Produtos na Tela
function carregarVitrine() {
    const vitrine = document.getElementById('vitrine');
    if(!vitrine) return;

    vitrine.innerHTML = produtos.map(p => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm item-produto">
                <img src="${p.img}" class="card-img-top" alt="${p.nome}" loading="lazy">
                <div class="card-body p-2">
                    <small class="text-muted">${p.cat}</small>
                    <h6 class="card-title mb-1">${p.nome}</h6>
                    <p class="fw-bold text-primary mb-2">R$ ${p.preco.toFixed(2)}</p>
                    <button class="btn btn-sm btn-dark w-100" onclick="addCarrinho(${p.id})">Adicionar</button>
                </div>
            </div>
        </div>
    `).join('');
    atualizarBadge();
}

// 3. Lógica do Carrinho
function addCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    localStorage.setItem('ryo_cart', JSON.stringify(carrinho));
    atualizarBadge();
    alert(`${produto.nome} adicionado!`);
}

function atualizarBadge() {
    document.querySelectorAll('.cart-count').forEach(el => el.innerText = carrinho.length);
}

function abrirModalCarrinho() {
    const modal = new bootstrap.Modal(document.getElementById('carrinhoModal'));
    const lista = document.getElementById('itens-carrinho');
    const totalEl = document.getElementById('total-carrinho');
    
    if(carrinho.length === 0) {
        lista.innerHTML = "<p class='text-center'>Seu carrinho está vazio.</p>";
        totalEl.innerText = "R$ 0,00";
    } else {
        let total = 0;
        lista.innerHTML = carrinho.map((item, index) => {
            total += item.preco;
            return `
                <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                    <span>${item.nome}</span>
                    <div class="d-flex align-items-center">
                        <span class="me-3 fw-bold">R$ ${item.preco.toFixed(2)}</span>
                        <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">×</button>
                    </div>
                </div>
            `;
        }).join('');
        totalEl.innerText = `R$ ${total.toFixed(2)}`;
    }
    modal.show();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('ryo_cart', JSON.stringify(carrinho));
    atualizarBadge();
    abrirModalCarrinho(); // Atualiza o modal aberto
}

// 4. Finalizar no WhatsApp
function finalizarPedido() {
    if(carrinho.length === 0) return alert("Adicione produtos primeiro!");

    let msg = "Olá RyoShopingArts! Tenho interesse nos produtos:\n\n";
    let total = 0;
    
    carrinho.forEach((p, i) => {
        msg += `*${i+1}.* ${p.nome} - R$ ${p.preco.toFixed(2)}\n`;
        total += p.preco;
    });

    msg += `\n*Total: R$ ${total.toFixed(2)}*`;
    
    const fone = "5531990681284";
    const url = `https://wa.me{fone}?text=${encodeURIComponent(msg)}`;
    
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', carregarVitrine);
