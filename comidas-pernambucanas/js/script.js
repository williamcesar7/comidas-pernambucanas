const produtos = [];

function adicionarProduto(tipo) {
    let produtoNome = '';
    let preco = 0;

    if (tipo === 'salgado') {
        const pratoSalgado = document.getElementById('lista-salgados');
        produtoNome = pratoSalgado.value;
        preco = parseFloat(pratoSalgado.options[pratoSalgado.selectedIndex].dataset.preco) || 0;
    } else if (tipo === 'sobremesa') {
        const sobremesa = document.getElementById('lista-sobremesas');
        produtoNome = sobremesa.value;
        preco = parseFloat(sobremesa.options[sobremesa.selectedIndex].dataset.preco) || 0;
    } else if (tipo === 'bebida') {
        const bebida = document.getElementById('lista-bebidas');
        produtoNome = bebida.value;
        preco = parseFloat(bebida.options[bebida.selectedIndex].dataset.preco) || 0;
    }

    if (produtoNome) {
        const produto = { nome: produtoNome, preco: preco, tipo: tipo };
        produtos.push(produto);
        atualizarLista();
    } else {
        alert("Por favor, selecione um item válido.");
    }
}

function adicionarTodos() {
    adicionarProduto('salgado');
    adicionarProduto('sobremesa');
    adicionarProduto('bebida');
}

function atualizarLista() {
    const lista = document.getElementById('produtos');
    lista.innerHTML = '';

    let totalPedido = 0;

    produtos.forEach((produto, index) => {
        const li = document.createElement('li');
        li.textContent = `${produto.nome} - R$${produto.preco.toFixed(2)}`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerProduto(index);

        li.appendChild(botaoRemover);
        lista.appendChild(li);

        totalPedido += produto.preco;
    });

    document.getElementById('total').textContent = `Total: R$${totalPedido.toFixed(2)}`;
}

function removerProduto(index) {
    produtos.splice(index, 1);
    atualizarLista();
}

function removerTodos() {
    produtos.length = 0;  // Limpa todos os produtos do array
    atualizarLista();     // Atualiza a lista e o total para refletir a remoção
}

function finalizarPedido() {
    // Coleta os dados do cliente
    const nome = document.getElementById('cliente-nome').value;
    const endereco = document.getElementById('cliente-endereco').value;
    const cidade = document.getElementById('cliente-cidade').value;
    const contato = document.getElementById('cliente-contato').value;

    // Verifica se todos os dados do cliente foram preenchidos
    if (!nome || !endereco || !cidade || !contato) {
        alert("Por favor, preencha todos os dados do cliente.");
        return;
    }

    // Atualiza o resumo do pedido com os dados do cliente
    document.getElementById('cliente-nome-exibido').textContent = `Nome: ${nome}`;
    document.getElementById('cliente-endereco-exibido').textContent = `Endereço: ${endereco}`;
    document.getElementById('cliente-cidade-exibido').textContent = `Cidade: ${cidade}`;
    document.getElementById('cliente-contato-exibido').textContent = `Contato: ${contato}`;

    // Atualiza o resumo dos produtos
    const listaResumo = document.getElementById('produtos-resumo');
    listaResumo.innerHTML = '';
    let totalPedido = 0;

    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.textContent = `${produto.nome} - R$${produto.preco.toFixed(2)}`;
        listaResumo.appendChild(li);
        totalPedido += produto.preco;
    });

    document.getElementById('total-resumo').textContent = `Total: R$${totalPedido.toFixed(2)}`;

    // Exibe a seção de resumo do pedido
    document.getElementById('resumo-pedido').style.display = 'block';
}
