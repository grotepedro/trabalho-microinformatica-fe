//----------------------------------------------- PÁGINA CONTATO -----------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const buscarCepBtn = document.getElementById("buscar-cep");
  
  buscarCepBtn.addEventListener("click", buscarCEP);
});

function buscarCEP() {
  const cep = document.getElementById("cep").value.replace(/\D/g, '');
  
  if (cep.length !== 8) {
    alert("CEP inválido! Deve ter 8 dígitos.");
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado!");
      } else {
        preencherEndereco(data);
      }
    })
    .catch(error => {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro na API ViaCEP!");
    });
}

function preencherEndereco(data) {
  document.getElementById("logradouro").value = data.logradouro;
  document.getElementById("cidade").value = data.localidade;
  document.getElementById("estado").value = data.uf;
}
// CRIAR USUÁRIO

function getFormData() {

    const nomeData = document.getElementById("nome").value
    const emailData = document.getElementById("email").value
    const cepData = document.getElementById("cep").value
    const logradouroData = document.getElementById("logradouro").value
    const numeroEnderecoData = document.getElementById("numeroEndereco").value
    const complementoData = document.getElementById("complemento").value
    const cidadeData = document.getElementById("cidade").value
    const estadoData = document.getElementById("estado").value
    
    console.log(nomeData)
    console.log(emailData)
    console.log(cepData)
    console.log(logradouroData)
    console.log(numeroEnderecoData)
    console.log(cidadeData)
    console.log(estadoData)

}

//----------------------------------------------- PROTÓTIPO RELATÓRIO -----------------------------------------------

var formPreco = document.getElementById("formPreco")
var formEspolios = document.getElementById("formEspolios") //colocar tudo dentro de uma var só
var formRecursos = document.getElementById("formRecursos")

var numAventureiros = formEspolios.elements.length // número de aventureiros    
var numRecursos = formPreco.elements.length // número de recursos

var nomesRecursos, nomesAventureiros = []   //1D

var matrizRecursos, matrizGastos = [] //2D

var listaPreco,  listaEspolios, listaDiferenca = [] //1D

var totalEspolios, totalGastos, totalLucro, totalIndividual = 0
  
var resultado = document.getElementById('resultado')
var dados = document.getElementById('dados')


//criar variaveis a partir das informações do HTML

function atualizarNomes() {     //atualizar todas as listas de nomes de aventureiros 
    nomesRecursos = []
    nomesAventureiros = []
    
    for (i=0; i<numRecursos; i++) {
        nomesRecursos.push(formPreco.elements[i].name)
    }

    for (i=0; i<numAventureiros; i++) {
        nomesAventureiros.push(formEspolios.elements[i].name)
    }
    //console.log(nomesRecursos)
    //console.log(nomesAventureiros)
}

function atualizarPreco() {     //atualiza todas os valores de preços a dos recursosL
    listaPreco = []
    
    for(i=0; i<formPreco.elements.length; i++){
    
    listaPreco.push(formPreco.elements[i].value)
    }    
    //console.log(listaPreco)
}

function atualizarEspolios() {  //atualiza todos os valores de espólios individuais
    listaEspolios = []
    
    for (i=0; i < formEspolios.elements.length; i++ ) {
        listaEspolios.push(formEspolios.elements[i].value)
    }
    //console.log(listaEspolios)
}

function atualizarRecursos() {  //atualiza a quantidade de recursos que cada aventureiro utilizou na missão
    matrizRecursos = []
    k = 0

    for (i=0; i < numRecursos; i++ ) {
        matrizRecursos.push([])
       
        for (j=0; j<numAventureiros; j++) {
            matrizRecursos[i].push(formRecursos.elements[k].value)
            k += 1
        }            
    }
   // console.log(matrizRecursos)
}

//calculos, etc etc

function calcularRecursos() {   //calcula os gastos com recursos na missão
    totalGastos = 0
    matrizGastos = []

    for (i=0; i < numRecursos; i++) {
        matrizGastos.push([])

        for (j=0; j < numAventureiros; j++) {
            matrizGastos[i].push(matrizRecursos[i][j] * listaPreco[i])    //adiciona item na matix matrizGastos
            totalGastos += parseFloat(matrizGastos[i][j]) //soma valor no totalGastos
        }
    }
    //console.log(totalGastos)
    //console.log(matrizGastos)
}

function calcularLucro() { //calcula o lucro total da missão
    totalEspolios = 0
    totalLucro = 0 
    totalIndividual = 0
    listaDiferenca = []

    for (i=0; i < numAventureiros; i++ ) {
        totalEspolios += parseInt(listaEspolios[i])
    }

    totalLucro = totalEspolios - totalGastos
    totalIndividual = parseFloat(totalLucro / numAventureiros)

    for (j=0; j < numAventureiros; j++ ) {
        listaDiferenca.push(totalIndividual-listaEspolios[j]+getGastosIndividual(j))
    }
    //console.log(totalEspolios)
    //console.log(totalLucro)
    //console.log(listaDiferenca)

}

function getGastosIndividual(a) { //calcula o gasto por aventureiro
    let b = 0

    for (i=0; i < numRecursos; i++){
        b += parseInt(matrizGastos[i][a])
    }
    return b

}

function escreverGastoPoritem (indiceRecurso){//calcula o gasto por item
    let b = 0
    let a = indiceRecurso

    for (i=0; i < numAventureiros; i++){
        b = b + parseInt(matrizGastos[a][i])
    }

    return `Os aventureiros gastaram um total de ${b} com ${nomesRecursos[a]}.</br>`

}


function escreverGastoPorAventureiro (a){ //
    let b = 0

    for (i=0; i < numRecursos; i++){
        b = b + parseInt(matrizGastos[i][a])
    }

    return `O(a) ${nomesAventureiros[a]} gastou um total de ${b} nessa aventura.</br>`

}

function escreverRecebeLucro(a){

    return `O(a) ${nomesAventureiros[a]} deve receber ${listaDiferenca[a]} moedas de ouro do grupo.</br>`
}

function escreverDarLucro(a){

    return `O(a) ${nomesAventureiros[a]} deve dar ${Math.abs(listaDiferenca[a])} moedas de ouro para o grupo.</br>`
}

function escreverEmpatou(a){

    return `O(a) ${nomesAventureiros[a]} teve seu lucro individual igual ao do grupo.<br>`
}

function escreveEspolioIndividual(a){

    return `O(a) ${nomesAventureiros[a]} arrecadou ${listaEspolios[a]} moedas de ouro em espólios.</br>`
}

function gerarRelatorio() {

    const btn = document.createElement("button")
    btn.innerHTML = "resetar"

    atualizarNomes()
    atualizarPreco()
    atualizarRecursos()
    atualizarEspolios()
    calcularRecursos()
    calcularLucro()

        dados.innerHTML = "<p></p>"

        resultado.innerHTML += `O total de espólios da missão foi ${totalEspolios}. </br></br>`

        for (y=0; y < numAventureiros; y++) {
            resultado.innerHTML += (escreveEspolioIndividual(y))
        }
        resultado.innerHTML += `</br>`
        for (x=0; x < numRecursos; x++) {
            resultado.innerHTML += (escreverGastoPoritem(x))
        }
        resultado.innerHTML += `</br>`
        for (y=0; y < numAventureiros; y++) {
            resultado.innerHTML += (escreverGastoPorAventureiro(y))
    
        }
        resultado.innerHTML += `</br>`
        resultado.innerHTML += (`O lucro da missão foi ${totalLucro} moedas de ouro.</br>`)
        resultado.innerHTML += `</br>`

       for (y=0; y < numAventureiros; y++) {
        if (listaDiferenca[y] < 0) {
            resultado.innerHTML += (escreverDarLucro(y))
        } else {
            if (listaDiferenca[y] > 0) {
                resultado.innerHTML += (escreverRecebeLucro(y))
            } else {
                resultado.innerHTML += (escreverEmpatou(y))
            }
        }
       }
       
       resultado.innerHTML += `</br><input type="button" value="Resetar" class="btn btn-primary" onclick="window.location.reload()"></input>`
}
