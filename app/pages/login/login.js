document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impedir o envio padrão do formulário
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;

        // Verificar se os campos de e-mail e senha estão vazios
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        fetch('http://localhost:3000/cadastros')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar dados de usuário');
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados recebidos:', data);
                const cadastros = data;
                const usuario = cadastros.find(user => user.email === email && user.senha === senha);

                if (usuario) {
                    window.location.href = '/app/index.html';
                } else {
                    alert('E-mail ou senha inválidos. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro na requisição fetch:', error.message);
                alert('Erro ao carregar dados de usuário. Por favor, tente novamente mais tarde.');
            });
    });
});
