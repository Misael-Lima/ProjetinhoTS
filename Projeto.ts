type ItemDeCompra = {
    nome: string;
    quantidade: number;
    categoria: string;
    status: string;
};

let gestoDeListaDeCompras: ItemDeCompra[] = [];

function addItem(): void {
    const nome: string = prompt("\nDigite o nome do item: ") || "";
    const quantidade: number = parseInt(prompt("Digite a quantidade: ") || "0");
    const categoria: string = prompt("Digite a categoria: ") || "";
  
    const novoItem: ItemDeCompra = {
        nome: nome,
        quantidade: quantidade,
        categoria: categoria,
        status: "não comprado",
    };

    gestoDeListaDeCompras.push(novoItem);
    console.log(`Item adicionado\n`, gestoDeListaDeCompras);
}

function removeItem(): void {
    let removerItem: string = prompt("Digite o item que deseja remover") || "";
    let indiceItem: number = gestoDeListaDeCompras.findIndex(item => item.nome === removerItem);

    if (indiceItem !== -1) {
        let confirmacao: boolean = confirm(`Tem certeza que deseja remover o item ${removerItem}?`);
        
        if (confirmacao) {
            gestoDeListaDeCompras.splice(indiceItem, 1);
            alert("Item removido!");
        } else {
            alert("Não foi possível remover");
        }
    } else {
        alert("Item não encontrado.");
    }
}

function editList(): void {
    let Editaritem: string = prompt("Digite o nome do item que deseja editar:") || "";
    let indiceItem: number = gestoDeListaDeCompras.findIndex(item => item.nome === Editaritem);

    if (indiceItem !== -1) {
        let item = gestoDeListaDeCompras[indiceItem];

        let novoNome: string = prompt(`Novo nome para ${item.nome}: `) || item.nome;
        let novaQuantidade: string = prompt(`Nova quantidade para ${item.nome}: `) || item.quantidade.toString();
        let novaCategoria: string = prompt(`Nova categoria para ${item.nome}: `) || item.categoria;

        item.nome = novoNome;
        item.quantidade = parseInt(novaQuantidade);
        item.categoria = novaCategoria;

        console.log("Item editado!");
    } else {
        alert("Item não encontrado na lista.");
    }
}

function displayList(ordenarPor?: string, filtrarPorCategoria?: string, filtrarPorStatus?: string): void {
    let itensFiltrados: ItemDeCompra[] = [...gestoDeListaDeCompras];

    if (filtrarPorCategoria) {
        itensFiltrados = itensFiltrados.filter(item => item.categoria === filtrarPorCategoria);
    }

    if (filtrarPorStatus) {
        itensFiltrados = itensFiltrados.filter(item => item.status === filtrarPorStatus);
    }

    itensFiltrados.sort((a, b) => {
        if (ordenarPor === 'nome') {
            return a.nome.localeCompare(b.nome);
        } else if (ordenarPor === 'categoria') {
            return a.categoria.localeCompare(b.categoria);
        } else if (ordenarPor === 'quantidade') {
            return a.quantidade - b.quantidade;
        }
        return 0;
    });

    console.log('Lista de compras:');
    itensFiltrados.forEach(item => {
        console.log(`${item.nome} (${item.quantidade}) - ${item.categoria} - ${item.status}`);
    });
}

function markItem(): void {
    let itemMarcar: string = prompt("Digite o nome do item que deseja marcar como comprado:") || "";
    let indiceItem: number = gestoDeListaDeCompras.findIndex(item => item.nome === itemMarcar);

    if (indiceItem !== -1) {
        let item = gestoDeListaDeCompras[indiceItem];
        item.status = item.status === "comprado" ? "não comprado" : "comprado"; 
        console.log(`O item ${item.nome} foi marcado como ${item.status}.`);
    } else {
        alert("Item não encontrado na lista.");
    }
}

function resumeItem(): void {
    let totalItens: number = gestoDeListaDeCompras.length;
    let categorias: { [key: string]: number } = {};
    let comprados: number = 0;
    let naoComprados: number = 0;

    gestoDeListaDeCompras.forEach(item => {
        categorias[item.categoria] = (categorias[item.categoria] || 0) + 1;
        item.status === "comprado" ? comprados++ : naoComprados++;
    });

    console.log(`Resumo da Lista de Compras:
    - Total de itens: ${totalItens}
    - Itens comprados: ${comprados}
    - Itens não comprados: ${naoComprados}`);

    console.log('Itens por categoria:');
    for (let [categoria, quantidade] of Object.entries(categorias)) {
        console.log(`- ${categoria}: ${quantidade}`);
    }
}

function menu(): void {
    while (true) {
        const option: number = parseInt(prompt(`
        OPÇÕES:
        1. ADICIONAR ITEM
        2. LISTAR ITENS
        3. EDITAR ITEM
        4. REMOVER ITEM
        5. MARCAR ITEM COMO COMPRADO
        6. RESUMO DA LISTA
        7. SAIR
        Digite um número como opção: `) || "0");

        switch (option) {
            case 1:
                addItem();
                break;
            case 2:
                displayList();
                break;
            case 3:
                editList();
                break;
            case 4:
                removeItem();
                break;
            case 5:
                markItem();
                break;
            case 6:
                resumeItem();
                break;
            case 7:
                console.log('Encerrando o programa...');
                return; // Para sair do loop
            default:
                console.log('Opção inválida, tente novamente.');
        }
    }
}

menu();
