const t=[];async function e(e,a,o,c){try{let r=await fetch(e,a),s=(await r.json()).data.products.slice(0,c),n=document.querySelector(o);n.innerHTML="",s.forEach(t=>{let e=document.createElement("div");e.classList.add("col-12","col-sm-6","col-md-4","col-lg-3","mb-3","d-flex","justify-content-center"),e.innerHTML=`
        <div class="card h-100 card-prod border-1 border-white shadow">
          <img src="${t.product_photo}" class="card-img-top" alt="${t.product_title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title card-title-prod">${t.product_title}</h5>
            <p class="price-prod">${t.product_price}</p>
            <button type="button" class="btn btn-success mt-auto comprar-btn" data-product-id="${t.product_id}" data-product-title="${t.product_title}" data-product-price="${t.product_price}" data-product-photo="${t.product_photo}">Comprar</button>
          </div>
        </div>
      `,n.appendChild(e)}),document.querySelectorAll(".comprar-btn").forEach(e=>{e.addEventListener("click",e=>{let a={id:e.target.dataset.productId,title:e.target.dataset.productTitle,price:e.target.dataset.productPrice,photo:e.target.dataset.productPhoto,quantity:1};(function(e){let a=t.findIndex(t=>t.id===e.id);a>-1?t[a].quantity+=1:t.push(e),function e(){let a=document.getElementById("cart-items");a.innerHTML="";let o=0;t.forEach((t,e)=>{o+=parseFloat(t.price.replace("R$","").replace(",","."))*t.quantity;let c=document.createElement("div");c.classList.add("cart-item"),c.innerHTML=`
      <div class="d-flex align-items-center">
        <img src="${t.photo}" class="img-thumbnail" alt="${t.title}">
        <div class="cart-item-details">
          <h6 class="mb-0">${t.title}</h6>
          <small class="text-muted">Pre\xe7o: ${t.price}</small>
        </div>
      </div>
      <div class="cart-item-controls">
        <button class="btn btn-sm btn-danger me-2 remove-btn" data-product-index="${e}">Excluir</button>
        <input type="number" class="form-control form-control-sm quantity-input" data-product-index="${e}" value="${t.quantity}" min="1">
      </div>
    `,a.appendChild(c)}),localStorage.setItem("subtotal",o.toFixed(2));let c=document.createElement("div");c.classList.add("d-flex","justify-content-between","fw-bold"),c.innerHTML=`
    <span>Subtotal</span>
    <span>R$${o.toFixed(2).replace(".",",")}</span>
  `,a.appendChild(c),document.querySelectorAll(".remove-btn").forEach(a=>{a.addEventListener("click",a=>{var o;o=a.target.dataset.productIndex,t.splice(o,1),e()})}),document.querySelectorAll(".quantity-input").forEach(a=>{a.addEventListener("change",a=>{var o,c;o=a.target.dataset.productIndex,c=a.target.value,t[o].quantity=parseInt(c),e()})}),document.getElementById("cart-canvas").classList.contains("show")||new bootstrap.Offcanvas(document.getElementById("cart-canvas")).show()}()})(a)})})}catch(t){console.error(t)}}const a={aminoacidos:`${baseUrl}&query=Amino\xe1cidos&page=1`,proteinas:`${baseUrl}&query=Prote\xednas&page=1`,massaMuscular:`${baseUrl}&query=Massa%20Muscular&page=1`,vitaminas:`${baseUrl}&query=Vitaminas&page=1`,emagrecimento:`${baseUrl}&query=Emagrecimento&page=1`};e(a.aminoacidos,options,"#suplementos-aminoacidos",3),e(a.proteinas,options,"#suplementos-proteinas",3),e(a.massaMuscular,options,"#suplementos-massa-muscular",3),e(a.vitaminas,options,"#suplementos-vitaminas",3),e(a.emagrecimento,options,"#suplementos-emagrecimento",3);
//# sourceMappingURL=index.4555cb15.js.map
