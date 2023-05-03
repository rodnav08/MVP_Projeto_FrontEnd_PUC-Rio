/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/tubos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.tubos.forEach(item => insertList(item.nome, item.diametro, item.espessura, item.material, item.produto, item.arranjo, item.origem, item.destino))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputPipe, inputDiam, inputEspess, inputMaterial, inputProduto, inputArranjo, inputOrigem, inputDestino) => {
  const formData = new FormData();
  formData.append('nome', inputPipe);
  formData.append('diametro', inputDiam);
  formData.append('espessura', inputEspess);
  formData.append('material', inputMaterial);
  formData.append('produto', inputProduto);
  formData.append('arranjo', inputArranjo);
  formData.append('origem', inputOrigem);
  formData.append('destino', inputDestino);


  let url = 'http://127.0.0.1:5000/tubo';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Está certo disso?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Tubo removido.")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/tubo?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  ---------------------------------------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, diametro, espessura, material, produto, arranjo, origem e destino 
  ---------------------------------------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputPipe = document.getElementById("newInput").value;
  let inputDiam = document.getElementById("newDiam").value;
  let inputEspess = document.getElementById("newEspess").value;
  let inputMaterial = document.getElementById("newMaterial").value
  let inputProduto = document.getElementById("newProduto").value;
  let inputArranjo = document.getElementById("newArranjo").value;
  let inputOrigem = document.getElementById("newOrigem").value;
  let inputDestino = document.getElementById("newDestino").value;


  if (inputPipe === '' || inputDiam === '' || inputEspess === '' || inputMaterial === '' || inputProduto === '' || inputArranjo === '' || inputOrigem === '' || inputDestino === '') {
    alert("Certifique-se de preencher todos os campos");
  } else if (isNaN(inputDiam) || isNaN(inputEspess)) {
    alert("Dados preenchidos incorretamente. Diâmetro e Espessura são dados numéricos.");
  } else if (inputOrigem == inputDestino) {
    alert("Origem e Destino devem ser diferentes")
  }
  else {
    insertList(inputPipe, inputDiam, inputEspess, inputMaterial, inputProduto, inputArranjo, inputOrigem, inputDestino)
    postItem(inputPipe, inputDiam, inputEspess, inputMaterial, inputProduto, inputArranjo, inputOrigem, inputDestino)
    alert("Tubo adicionado a base de dados.")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nome, diametro, espessura, material, produto, arranjo, origem, destino) => {
  var item = [nome, diametro, espessura, material, produto, arranjo, origem, destino]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newDiam").value = "";
  document.getElementById("newEspess").value = "";
  document.getElementById("newMaterial").value = "";
  document.getElementById("newProduto").value = "";
  document.getElementById("newArranjo").value = "";
  document.getElementById("newOrigem").value = "";
  document.getElementById("newDestino").value = "";


  removeElement()
}