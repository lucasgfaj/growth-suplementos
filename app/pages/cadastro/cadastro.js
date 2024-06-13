document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('myForm');

    // Função para mostrar mensagem de erro
    function mostrarMensagemDeErro(campo) {
        const spanErro = document.getElementById(`${campo.id}-error`);
        if (!spanErro) {
            const errorElement = document.createElement('span');
            errorElement.id = `${campo.id}-error`;
            errorElement.classList.add('error', 'text-danger');
            errorElement.textContent = campo.validationMessage;
            campo.parentNode.insertBefore(errorElement, campo.nextSibling);
        } else {
            spanErro.textContent = campo.validationMessage;
        }
        campo.classList.add('is-invalid');
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
    formulario.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evitar envio do formulário

        const nome = document.getElementById('nomeCompleto');
        const email = document.getElementById('email');
        const cpf = document.getElementById('cpf');
        const dataNascimento = document.getElementById('dataNascimento');
        const telefoneCelular = document.getElementById('telefoneCelular');
        const telefoneFixo = document.getElementById('telefoneFixo'); // Novo campo
        const promocoesWhatsApp = document.getElementById('promocoesWhatsApp'); // Novo campo
        const atualizacoesWhatsApp = document.getElementById('atualizacoesWhatsApp'); // Novo campo
        const genero = document.querySelector('input[name="genero"]:checked'); // Novo campo
        const senha = document.getElementById('senha');

        if (!formulario.checkValidity()) {
            // Se o formulário não for válido, exibir mensagens de erro
            mostrarMensagemDeErro(nome);
            mostrarMensagemDeErro(email);
            mostrarMensagemDeErro(cpf);
            mostrarMensagemDeErro(dataNascimento);
            mostrarMensagemDeErro(telefoneCelular);
            if (telefoneFixo) mostrarMensagemDeErro(telefoneFixo); // Validar campo opcional
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
            telefoneFixo: telefoneFixo ? telefoneFixo.value : null, // Novo campo
            promocoesWhatsApp: promocoesWhatsApp.checked, // Novo campo
            atualizacoesWhatsApp: atualizacoesWhatsApp.checked, // Novo campo
            genero: genero ? genero.value : null, // Novo campo
            senha: senha.value
        };

        // Tentar salvar os dados no JSON Server
        const sucesso = await salvarDadosNoServidor(dadosFormulario);
        if (sucesso) {
            window.location.href = '/app/pages/login/login.html'; // Redirecionar para a página de login
        } else {
            console.error('Erro ao realizar o cadastro. Tente novamente.');
        }
    });
});
