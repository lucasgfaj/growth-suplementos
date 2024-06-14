const url = 'https://real-time-amazon-data.p.rapidapi.com/search?query=Suplementos&page=2&country=BR&sort_by=RELEVANCE&product_condition=ALL';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '9a32974eb9msh98c2b8aa92f618fp17a99ajsnd92340d62b48',
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    }
};

async function fetchProducts(url, options, containerId, limit) {
  try {
      const response = await fetch(url, options);
      const data = await response.json();
      const products = data.data.products.slice(0, limit); // Slice para limitar o número de produtos

      const container = document.querySelector(containerId);

      // Limpa o conteúdo do contêiner antes de adicionar os novos produtos
      container.innerHTML = '';

      // Loop pelos produtos e cria os cards dinamicamente
      products.forEach(product => {
          const card = document.createElement('div');
          card.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-3', 'd-flex', 'justify-content-center');
          card.innerHTML = `
              <div class="card h-100 card-prod border-1 border-white shadow">
                  <img src="${product.product_photo}" class="card-img-top" alt="${product.product_title}">
                  <div class="card-body d-flex flex-column">
                      <h5 class="card-title card-title-prod">${product.product_title}</h5>
                      <p class="price-prod">${product.product_price}</p>
                      <button type="button" class="btn btn-success mt-auto">Comprar</button>
                  </div>
              </div>
          `;
          container.appendChild(card);
      });
  } catch (error) {
      console.error(error);
  }
}

// Defina o número máximo de cartões por sessão
const limitPerSession = 3;

// Chamada da função para preencher os cards de cada seção com os produtos da API
fetchProducts(url, options, "#suplementos-aminoacidos", limitPerSession);
fetchProducts(url, options, "#suplementos-proteinas", limitPerSession);
fetchProducts(url, options, "#suplementos-massa-muscular", limitPerSession);
fetchProducts(url, options, "#suplementos-vitaminas", limitPerSession);
fetchProducts(url, options, "#suplementos-emagrecimento", limitPerSession);
