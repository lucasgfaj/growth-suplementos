document.addEventListener('DOMContentLoaded', function () {
    // Lidar com o envio do formulário
    $('#loginForm').on('submit', function (event) {
        event.preventDefault(); // Impedir o envio padrão do formulário
        const email = $('#email').val().trim(); // Remover espaços em branco extras do email
        const senha = $('#senha').val();
        // Verificar se os campos de e-mail e senha estão vazios
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        // Obter os dados dos usuários do arquivo JSON
        $.getJSON('/server/db.json', function (data) {
            const cadastros = data.cadastros;
            // Verificar se o usuário existe com o email e senha fornecidos
            const usuario = cadastros.find(function (user) {
                return user.email === email && user.senha === senha;
            });
            if (usuario) {
                // Login bem-sucedido, redirecionar para a página principal
                window.location.href = '/app/index.html';
                alert('Login bem-sucedido! Bem-vindo de volta.');
            } else {
                // Exibir mensagem de erro de login
                alert('E-mail ou senha inválidos. Por favor, tente novamente.');
            }
        }).fail(function() {
            // Exibir mensagem de erro se houver falha ao carregar o arquivo JSON
            alert('Erro ao carregar dados de usuário. Por favor, tente novamente mais tarde.');
        });
    });
});
