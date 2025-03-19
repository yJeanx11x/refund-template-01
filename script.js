const expense = document.querySelector("#expense");
const category = document.querySelector("#category");
const form = document.querySelector("form");

//Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");
const expensesTotal=document.querySelector('aside header h2')
const expenseQuantity=document.querySelector('aside header p span')

//Tirando as Letras Do input,É deixando apenas números.
const amount = document.querySelector("#amount");
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");
  //trasforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$1,50).
  value = Number(value) / 100;

  amount.value = fomatCurrencyBRL(value);
};

function fomatCurrencyBRL(value) {
  //Formata o valor padrão BRL (Real Brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  //Retorna o valor Formatado
  return value;
}

//Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
  //Previne o compotamento padrão de recarregar a página.
  event.preventDefault();

  //cria um objeto com os detalhes na nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
  //chama a função que irá adicionar o item na lista.
  expenseAdd(newExpense);
};
// Adiciona um novo item na lista.
function expenseAdd(newExpense) {
  try {
    //cria o o elemento para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o ícone da categoria.
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //Criar a info da despesa.
    const expensedeInfo = document.createElement("div");
    expensedeInfo.classList.add("expense-info");

    //Cria o nome da despesa.
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    //Cria a categoria da despesa.
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    //Adiciona nome e categoria na div das informações da despesa.
    expensedeInfo.append(expenseName, expenseCategory);

    //Cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", " ")}`;

   //Cria o ícone de remover
   const removerIcon=document.createElement('img') 
   removerIcon.classList.add('remove-icon')
   removerIcon.setAttribute('src',"img/remove.svg")
   removerIcon.setAttribute('alt','remover')

    //Adiciona as informações no item
    expenseItem.append(expenseIcon, expensedeInfo, expenseAmount, removerIcon);

    //Adiciona o item na lista.
    expenseList.append(expenseItem);

    //Atualiza os totais.
    updateTotals()
  } catch (error) {
    alert("Não Foi possível atualizar a lista de despesas");
    console.log(error);
  }
}

//Atualiza os totais.

function updateTotals(){
  try {
    //Recupera todos os itens (li) da lista (ul).
    const items=expenseList.children

    //Atualiza a quantidade de itens da lista.

    expenseQuantity.textContent=`${items.length} ${items.length > 1 ? "despesas" : 'despesa'}`

    //Variável para incrementar o total.
    let total=0

    //Percorre cada item (li) da lista (ul)
    for(let item= 0;item <items.length;item ++){
      const itemAmount=items[item].querySelector('.expense-amount')

      //Remove caracteres não númericos e substitui a vírgula pelo ponto.
      let value=itemAmount.textContent.replace(/[^\d]/g, "").replace(',',".")

      //Converte o valor para float
      value=parseFloat(value)

      //Verifica se é um número válido 
      if(isNaN(value)){
        return alert('Não foi possível atualizar os totais.O valor não parecer ser um número.')
      }

      //Incrementa o valor Total.
      total+=Number(value)
      
    }
    expensesTotal.textContent=total

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais. ")
  }
}