$(document).ready(function() {
    const formulario = $('#myForm');

    // Função para mostrar mensagem de erro
    function mostrarMensagemDeErro(campo) {
        const spanErro = $(`#${campo.id}-error`);
        if (spanErro.length === 0) {
            const errorElement = $('<span>').attr('id', `${campo.id}-error`).addClass('error text-danger').text(campo.validationMessage);
            $(campo).after(errorElement);
        } else {
            spanErro.text(campo.validationMessage);
        }
        $(campo).addClass('is-invalid');
    }

    // Função para salvar os dados no JSON Server
    async function salvarDadosNoServidor(dados) {
        try {
            const response = await fetch('http://localhost:3000/cadastros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            return response.ok;
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
            return false;
        }
    }

    // Evento de submit do formulário
    formulario.on('submit', async function(event) {
        event.preventDefault(); // Evitar envio do formulário

        const nome = $('#nomeCompleto')[0];
        const email = $('#email')[0];
        const cpf = $('#cpf')[0];
        const dataNascimento = $('#dataNascimento')[0];
        const telefoneCelular = $('#telefoneCelular')[0];
        const telefoneFixo = $('#telefoneFixo')[0]; // Novo campo
        const promocoesWhatsApp = $('#promocoesWhatsApp')[0]; // Novo campo
        const atualizacoesWhatsApp = $('#atualizacoesWhatsApp')[0]; // Novo campo
        const genero = $('input[name="genero"]:checked')[0]; // Novo campo
        const senha = $('#senha')[0];

        if (!formulario[0].checkValidity()) {
            // Se o formulário não for válido, exibir mensagens de erro
            mostrarMensagemDeErro(nome);
            mostrarMensagemDeErro(email);
            mostrarMensagemDeErro(cpf);
            mostrarMensagemDeErro(dataNascimento);
            mostrarMensagemDeErro(telefoneCelular);
            mostrarMensagemDeErro(telefoneFixo); // Validar campo opcional
            mostrarMensagemDeErro(senha);
            return;
        }

        // Criar objeto com os dados do formulário
        const dadosFormulario = {
            nome: nome.value,
            email: email.value,
            cpf: cpf.value,
            dataNascimento: dataNascimento.value,
            telefoneCelular: telefoneCelular.value,
            telefoneFixo: telefoneFixo.value, // Novo campo
            promocoesWhatsApp: promocoesWhatsApp.checked, // Novo campo
            atualizacoesWhatsApp: atualizacoesWhatsApp.checked, // Novo campo
            genero: genero.value, // Novo campo
            senha: senha.value
        };

        // Tentar salvar os dados no JSON Server
        const sucesso = await salvarDadosNoServidor(dadosFormulario);
        if (sucesso) {
            window.location.href = '../login/login.html'; // Redirecionar para a página de login
        } else {
            console.error('Erro ao realizar o cadastro. Tente novamente.');
        }
    });
});
