'use strict';

const limparCampos = () => {
    document.getElementById('cep').value = "";
    document.getElementById('rua').textContent = "";
    document.getElementById('bairro').textContent = "";
    document.getElementById('cidade').textContent = "";
    document.getElementById('estado').textContent = "";
    document.getElementById('cep').focus();
};

const preencherForm = (endereco) => {
    document.getElementById('rua').textContent = endereco.logradouro || "Não informado";
    document.getElementById('bairro').textContent = endereco.bairro || "Não informado";
    document.getElementById('cidade').textContent = endereco.localidade || "Não informado";
    document.getElementById('estado').textContent = endereco.uf || "Não informado";
};

const cepValido = (cep) => cep.length === 8 && /^[0-9]+$/.test(cep);

const pesquisarCEP = async () => {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove traços e espaços

    if (!cepValido(cep)) {
        alert('CEP incorreto! Digite um CEP válido com 8 dígitos.');
        limparCampos();
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        const endereco = await response.json();

        if (endereco.erro) {
            alert('CEP não encontrado!');
            limparCampos();
            return;
        }

        preencherForm(endereco);

    } catch (error) {
        alert('Erro ao buscar o CEP! Verifique sua conexão.');
    }
};

// Quando pressionar "Enter" no campo de CEP, chama a função de busca
document.getElementById('cep').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        pesquisarCEP(); // Chama a função de busca
    }
});

// Chamando a função pelo botão
document.getElementById('buscarCep').addEventListener('click', pesquisarCEP);
document.getElementById('limparCampos').addEventListener('click', limparCampos);