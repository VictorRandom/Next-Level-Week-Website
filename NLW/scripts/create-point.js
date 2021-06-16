

function populateUFs() 
{
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") //buscou o estado e dados
    .then( res => res.json() ) //transformou o arquivo em json
    .then( states => { //puxar do arquivo para ca

        for(const state of states)
        {
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }          
            
    } )
}

populateUFs()


function getCities(event)
{
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecionar a Cidade</option>"
    citySelect.disabled = true

    fetch(url) //buscou o estado e dados
    .then( res => res.json() ) //transformou o arquivo em json
    .then( cities => { //puxar do arquivo para ca


        for(const city of cities)
        {
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
            
    } )
   
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

/*
document
    .querySelector("select[name=uf]")
    .addEventListener("change", () => {
        console.log("mudei")
    } )   
*/



// Itens de coleta
//pegar todos os LI`s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItem = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma classe com JS (poderia usar .add ou .remove, o toggle faz um ou outro)
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //verificar se existem itens selecionados, se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId /* = é para substituir valor, == é para comparar valor*/
        return itemFound
    } )

    //se já tiver selecionado
    if (alreadySelected >= 0) 
    { //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent //se false tira do array
        })
         
        selectedItems = filteredItems
    } else //se não tiver selecionado
    { //adicionar da seleção
        selectedItems.push(itemId)
    }  

    //atualizar o campo escondido com os itens selecionados
    collectedItem.value = selectedItems
    

}