document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const total = params.get("total");
    const cart = JSON.parse(decodeURIComponent(params.get("cart")));

    if (total) {
      document.querySelector(".div-resumo-compra .card-body .fw-bold span").innerText = `R$ ${total}`;
      document.querySelector(".div-resumo-compra .card-body .mt-5 h3 span").innerText = `R$ ${total}`;
    }

    const resumoContainer = document.querySelector(".div-resumo-compra .card-body .row");

    cart.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("div-produto", "col-12", "p-3");
      productDiv.innerHTML = `
        <p class="fw-bold">${product.title}</p>
        <p class="mt-1">Quantidade: ${product.quantity}</p>
        <p class="mt-1">R$ ${(parseFloat(product.price.replace('R$', '').replace(',', '.')) * product.quantity).toFixed(2).replace('.', ',')}</p>
      `;
      resumoContainer.appendChild(productDiv);
    });
  });