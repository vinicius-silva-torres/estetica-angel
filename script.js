const WHATSAPP_NUMERO = "5511964233965";
const INSTAGRAM_URL = "https://instagram.com/seuinstagram";

// 1. Links dinâmicos de WhatsApp e Instagram
document.querySelectorAll('.link-whatsapp').forEach(link => {
  const servico = link.getAttribute('data-servico') || 'Estética Facial e Corporal';
  const msg = `Olá! Vi o site da clínica e gostaria de informações e valores sobre *${servico}*.`;
  link.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`;
});

document.querySelectorAll('.link-instagram').forEach(link => {
  link.href = INSTAGRAM_URL;
});

document.getElementById('ano-atual').textContent = new Date().getFullYear();

// 2. Troca suave com efeito Blur na palavra de destaque do H1
const palavrasMassoterapia = [
  "Massagem Relaxante.",
  "Drenagem Linfática.",
  "Liberação Miofascial.",
  "Estética Corporal."
];
const elementoPalavra = document.getElementById("palavra-troca");
let indicePalavra = 0;

if (elementoPalavra) {
  setInterval(() => {
    elementoPalavra.classList.add("trocando-blur");
    setTimeout(() => {
      indicePalavra = (indicePalavra + 1) % palavrasMassoterapia.length;
      elementoPalavra.textContent = palavrasMassoterapia[indicePalavra];
      elementoPalavra.classList.remove("trocando-blur");
    }, 450);
  }, 3600);
}

// 3. Carrossel Estilo Instagram (Mantendo a base centro/esquerda/direita)
const carrossel = document.querySelector('.carrossel-galeria');
const cardsCarrossel = document.querySelectorAll('.card-carrossel');
const dots = document.querySelectorAll('#indicadores-carrossel .dot');
let indiceAtual = 0;
let relogio = 0;

function atualizarCarrossel() {
  const total = cardsCarrossel.length;
  const esquerda = (indiceAtual - 1 + total) % total;
  const direita = (indiceAtual + 1) % total;

  cardsCarrossel.forEach(card => {
    card.classList.remove('centro', 'esquerda', 'direita');
  });

  cardsCarrossel[indiceAtual].classList.add('centro');
  cardsCarrossel[esquerda].classList.add('esquerda');
  cardsCarrossel[direita].classList.add('direita');

  dots.forEach((dot, index) => {
    dot.classList.toggle('ativo', index === indiceAtual);
  });
}

if (cardsCarrossel.length > 0 && carrossel) {
  atualizarCarrossel();
  relogio = setInterval(() => {
    indiceAtual = (indiceAtual + 1) % cardsCarrossel.length;
    atualizarCarrossel();
  }, 3500);

  let toqueInicialX = 0;
  carrossel.addEventListener('touchstart', (e) => {
    clearInterval(relogio);
    toqueInicialX = e.touches[0].clientX;
  }, { passive: true });

  carrossel.addEventListener('touchend', (e) => {
    const toqueFinalX = e.changedTouches[0].clientX;
    if (toqueInicialX - toqueFinalX > 40) {
      indiceAtual = (indiceAtual + 1) % cardsCarrossel.length;
    } else if (toqueFinalX - toqueInicialX > 40) {
      indiceAtual = (indiceAtual - 1 + cardsCarrossel.length) % cardsCarrossel.length;
    }
    atualizarCarrossel();
    relogio = setInterval(() => {
      indiceAtual = (indiceAtual + 1) % cardsCarrossel.length;
      atualizarCarrossel();
    }, 3500);
  });
}

// 4. Comparador Antes e Depois
const slider = document.getElementById('slider-comparador');
const antesWrapper = document.getElementById('antes-wrapper');
const linhaDivisoria = document.getElementById('linha-divisoria');
const comparador = document.getElementById('comparador');
const imgAntes = document.querySelector('.img-antes');

function ajustarLarguraImagemAntes() {
  if (comparador && imgAntes) {
    imgAntes.style.width = `${comparador.offsetWidth}px`;
  }
}

window.addEventListener('resize', ajustarLarguraImagemAntes);
window.addEventListener('load', ajustarLarguraImagemAntes);

if (slider && antesWrapper && linhaDivisoria) {
  slider.addEventListener('input', (e) => {
    const valor = `${e.target.value}%`;
    antesWrapper.style.width = valor;
    linhaDivisoria.style.left = valor;
  });
}