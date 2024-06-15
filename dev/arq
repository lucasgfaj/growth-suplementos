const baseUrl = 'https://real-time-amazon-data.p.rapidapi.com/search?query=suplementos&page=1&country=BR&sort_by=RELEVANCE&product_condition=ALL';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'b41f5c9d43msh1a33ee9822ff38bp1be284jsnc3b2d908851c',
    'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
  }
};
const cart = [];

async function fetchProducts(url, options, containerId, limit) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const products = data.data.products.slice(0, limit);

    const container = document.querySelector(containerId);
    container.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add(
        "col-12",
        "col-sm-6",
        "col-md-4",
        "col-lg-3",
        "mb-3",
        "d-flex",
        "justify-content-center"
      );
      card.innerHTML = `
        <div class="card h-100 card-prod border-1 border-white shadow">
          <img src="${product.product_photo}" class="card-img-top" alt="${product.product_title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title card-title-prod">${product.product_title}</h5>
            <p class="price-prod">${product.product_price}</p>
            <button type="button" class="btn btn-success mt-auto comprar-btn" data-product-id="${product.product_id}" data-product-title="${product.product_title}" data-product-price="${product.product_price}" data-product-photo="${product.product_photo}">Comprar</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll('.comprar-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const product = {
          id: e.target.dataset.productId,
          title: e.target.dataset.productTitle,
          price: e.target.dataset.productPrice,
          photo: e.target.dataset.productPhoto,
          quantity: 1
        };
        addToCart(product);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

function addToCart(product) {
  const productInCart = cart.find(item => item.id === product.id);
  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    cart.push(product);
  }
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach(product => {
    total += parseFloat(product.price.replace('R$', '').replace(',', '.')) * product.quantity;
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${product.photo}" class="img-thumbnail" alt="${product.title}">
        <div class="cart-item-details">
          <h6 class="mb-0">${product.title}</h6>
          <small class="text-muted">Preço: ${product.price}</small>
        </div>
      </div>
      <div class="cart-item-controls">
        <button class="btn btn-sm btn-danger me-2 remove-btn" data-product-id="${product.id}">Excluir</button>
        <input type="number" class="form-control form-control-sm quantity-input" data-product-id="${product.id}" value="${product.quantity}" min="1">
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  const totalContainer = document.createElement("div");
  totalContainer.classList.add("d-flex", "justify-content-between", "fw-bold");
  totalContainer.innerHTML = `
    <span>Subtotal</span>
    <span>R$${total.toFixed(2).replace('.', ',')}</span>
  `;
  cartItemsContainer.appendChild(totalContainer);

  // Adicionando botão "Ir para pagamento"
  const paymentButton = document.createElement("button");
  paymentButton.classList.add("btn", "btn-success", "mt-3");
  paymentButton.innerText = "Ir para pagamento";
  paymentButton.addEventListener('click', () => {
    window.location.href = `/app/pages/pagamento/pagamento.html?total=${total.toFixed(2).replace('.', ',')}&cart=${encodeURIComponent(JSON.stringify(cart))}`;
  });
  cartItemsContainer.appendChild(paymentButton);

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      removeFromCart(e.target.dataset.productId);
    });
  });

  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', (e) => {
      updateQuantity(e.target.dataset.productId, e.target.value);
    });
  });

  const cartCanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cart-canvas'));
  if (!cartCanvas) {
    new bootstrap.Offcanvas(document.getElementById('cart-canvas')).show();
  } else {
    cartCanvas.show();
  }
}

function removeFromCart(productId) {
  const productIndex = cart.findIndex(item => item.id === productId);
  if (productIndex > -1) {
    cart.splice(productIndex, 1);
    updateCart();
  }
}

function updateQuantity(productId, quantity) {
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity = parseInt(quantity);
    updateCart();
  }
}

// Defina o número máximo de cartões por sessão
const limitPerSession = 3;

// URLs específicas para cada categoria de suplemento
const urls = {
  aminoacidos: `${baseUrl}&query=Aminoácidos&page=1`,
  proteinas: `${baseUrl}&query=Proteínas&page=1`,
  massaMuscular: `${baseUrl}&query=Massa%20Muscular&page=1`,
  vitaminas: `${baseUrl}&query=Vitaminas&page=1`,
  emagrecimento: `${baseUrl}&query=Emagrecimento&page=1`
};

// Chamada da função para preencher os cards de cada seção com os produtos da API
fetchProducts(urls.aminoacidos, options, "#suplementos-aminoacidos", limitPerSession);
fetchProducts(urls.proteinas, options, "#suplementos-proteinas", limitPerSession);
fetchProducts(urls.massaMuscular, options, "#suplementos-massa-muscular", limitPerSession);
fetchProducts(urls.vitaminas, options, "#suplementos-vitaminas", limitPerSession);
fetchProducts(urls.emagrecimento, options, "#suplementos-emagrecimento", limitPerSession);
