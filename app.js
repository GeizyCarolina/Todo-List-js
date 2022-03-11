// Passos

/* 

1 - CRIAR A AREA DA TAREFA

2 - QUAL TAREFA ELE VAI RECEBER(PARAMETRO)

3 - RISCAR/MARCAR A TAREFA(PARAMETRO)

4 - CRIAR UM BANCO DE DADOS

5 - INSERIR AS TAREFAS SEMPRE QUE ATUALIZAR A TELA

6 - ADICIONAR UM EVENTO PARA A TECLA ENTER

7 - INSERIR A TAREFA DIGITADA NO BANCO

8 - INSERIR ID NAS TAREFAS PARA FAZER A EXCLUSAO (criarItem e atualizar tela)

9 - CRIAR FUNCAO PARA EXCLUIR A TAREFA

10 - ATUALIZAR O CHECKBOX 

11 - USAR O LOCALSTORAGE PARA AS TAREFAS NAO VOLTAREM QUANDO CARREGA A TELA

/*      <label class="todo__item">
            <input type="checkbox">
            <div>teste de item 1</div>
            <input type="button" value="X">
        </label>  
*/
const banco = [
    {'tarefa': 'estudar', 'status': ''},
    {'tarefa': 'netfli', 'status': 'checked'}

]


const criarItem = (tarefa, status, indice) => {
    // criar a label 
    let itemlabel = document.createElement('label')
    
    // inserir a classe todo__list
    itemlabel.classList.add('todo__item')
    itemlabel.innerHTML = `

        <input type="checkbox" ${status}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    // adicionar o item criado 
    let additem = document.getElementById('todo__list')
    additem.appendChild(itemlabel)

}


const limparTarefas = () => {
    const todolist = document.getElementById('todo__list')
    // enquanto exixtir o primeiro filho vai remover 
    while(todolist.firstChild){
        // remove o filho do todo_list o ultimo filho
        todolist.removeChild(todolist.lastChild)
    }
}

const atualizarTela = () => {
    
    limparTarefas()
    //percorrer o banco para exibir as tarefas
    banco.forEach((x, indice ) => criarItem(x.tarefa, x.status, indice))

}

// adicionar evento no input 
let tecla_enter = document.getElementById('newItem')
tecla_enter.addEventListener('keypress', function(event){
    
    const tecla = event.key

    if(tecla === 'Enter'){
        // inserir o dado do input no banco 
        banco.push({'tarefa': event.target.value, 'status': ''}) //event.target.value = pega o texto que foi digitado no input
        atualizarTela()
        event.target.value = '' // limpar o campo
    }

})

// excluir tarefa

const removerItem = (indice) =>{
    banco.splice(indice, 1); //O método adiciona e/ou remove elementos do array = remove a partir do indice do parametro 
                             // 1 para ser ele proprio
    atualizarTela()
}

let btn_deletar = document.getElementById('todo__list')
btn_deletar.addEventListener('click', function(event){
    
    // pegar o evento selecionado
    const elemento = event.target;
    
    if(elemento.type === "button"){
        const indice = elemento.dataset.indice // pegar o indice para exclusao
        removerItem(indice)
    }else if(elemento.type === "checkbox"){
        const indice = elemento.dataset.indice // pegar o indice para exclusao
        atualizarItem(indice)
    }
})

// atualizar o checkbox
const atualizarItem = (indice) => {
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''; 
    // ternario se o checkbox estiver marcado (desmarca) se na (marca)
    atualizarTela()
}

atualizarTela()