document.addEventListener("DOMContentLoaded", function() {
  const subtotal = localStorage.getItem('subtotal');
  if (subtotal !== null) {
    document.querySelector('.subtotal-value').innerText = `R$ ${subtotal.replace('.', ',')}`;
  }

  // Adicionar evento de clique ao botão "Comprar"
  document.getElementById('mensagem').addEventListener('click', function() {
    // Exibir o alerta usando SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Compra Realizada com Sucesso!',
      showConfirmButton: false,
      timer: 1500, // Fecha automaticamente após 1.5 segundos
      timerProgressBar: true, // Mostra a barra de progresso do timer
      didClose: () => {
        // Redirecionar para o index.html após o alerta ser fechado
        window.location.href = '/app/index.html';
      }
    });
  });
});

// Limpar o localStorage quando a página está sendo descarregada (antes de sair)
window.addEventListener('beforeunload', function() {
  localStorage.removeItem('subtotal');
});
