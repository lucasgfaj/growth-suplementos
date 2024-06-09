function submitForm() {
    // Obter os valores dos campos do formulário
    var emailInput = document.getElementById('email');
    var cpfInput = document.getElementById('cpf');
    var nomeCompletoInput = document.getElementById('nomeCompleto');
    var dataNascimentoInput = document.getElementById('dataNascimento');
    var telefoneCelularInput = document.getElementById('telefoneCelular');
    var telefoneFixoInput = document.getElementById('telefoneFixo');
    var generoInputs = document.querySelectorAll('input[name="genero"]');
    var senhaInput = document.getElementById('senha');
    var promocoesOfertasInput = document.getElementById('promocoesOfertas');
    var promocoesWhatsAppInput = document.getElementById('promocoesWhatsApp');
    var atualizacoesWhatsAppInput = document.getElementById('atualizacoesWhatsApp');

    // Verificar se todos os campos obrigatórios foram preenchidos
    var isEssentialsFilled = true;

    // Função para adicionar ou remover classes de validação
    function updateValidation(inputElement, isValid) {
        inputElement.classList.remove('is-valid', 'is-invalid');
        if (isValid) {
            inputElement.classList.add('is-valid');
        } else {
            inputElement.classList.add('is-invalid');
        }
    }

    // Função para verificar se o campo está preenchido
    function validateField(inputElement) {
        var value = inputElement.value.trim();
        if (value === '') {
            isEssentialsFilled = false;
            updateValidation(inputElement, false);
        } else {
            updateValidation(inputElement, true);
        }
    }

    // Validação dos campos essenciais
    validateField(emailInput);
    validateField(cpfInput);
    validateField(nomeCompletoInput);
    validateField(telefoneCelularInput);
    validateField(dataNascimentoInput);
    validateField(senhaInput);

    // Verificar se os campos de checkbox estão marcados
    if (!promocoesOfertasInput.checked || !promocoesWhatsAppInput.checked || !atualizacoesWhatsAppInput.checked) {
        isEssentialsFilled = false;
    }

    // Se todos os campos essenciais foram preenchidos, permitir o envio do formulário
    if (isEssentialsFilled) {
        // Restante do código de envio do formulário...
        alert('Campos essenciais preenchidos. Enviando formulário...');
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}
