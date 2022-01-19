var mqtt = require('mqtt');
const readline = require('readline');

var client  = mqtt.connect('mqtt://test.mosquitto.org');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isInMenu = true;
let menuOption = "";

client.on('connect', function () {
  client.subscribe('sistema', function (err) {
    if (!err) {
      console.log("Sem erro");
    }
  });
});

client.on('message', (topic, message) => {
  const dados = JSON.parse(message.toString());

  if (topic === "sistema") {
    try{
      switch(dados.funcao){
        case 'listar-produtos':
          const produtos = JSON.parse(dados.dados);
      
          let mensagem = "";
      
          produtos.forEach((produto) => {
            mensagem += `Id: ${produto.id} \nNome: ${produto.nome} \nPreço: ${produto.preco}\n\n`;
          });
          console.log(mensagem);
          menuOption = "";
          isInMenu = true;
          console.log("Digite:"+
                "\n>>>1 -> para listar os produtos"+
                "\n>>>2 -> para adicionar produtos no carrinho"+
                "\n>>>3 -> para remover produtos do carrinho"+
                "\n>>>4 -> para listar os produtos no carrinho"+
                "\n>>>5 -> para pagar os produtos no carrinho"+
                "\n>>>6 -> para solicitar a entrega de um pedido"+
                "\n>>>7 -> para listar os pedidos"
                );
          break;
        case 'adicionar-carrinho':
          const mensagem2 = dados.dados;
          console.log(mensagem2);
          menuOption = "";
          isInMenu = true;
          console.log("Digite:"+
                "\n>>>1 -> para listar os produtos"+
                "\n>>>2 -> para adicionar produtos no carrinho"+
                "\n>>>3 -> para remover produtos do carrinho"+
                "\n>>>4 -> para listar os produtos no carrinho"+
                "\n>>>5 -> para pagar os produtos no carrinho"+
                "\n>>>6 -> para solicitar a entrega de um pedido"+
                "\n>>>7 -> para listar os pedidos"
                );
          break;
        case 'remover-carrinho':
          const mensagem3 = dados.dados;
          console.log(mensagem3);
          menuOption = "";
          isInMenu = true;
          console.log("Digite:"+
                "\n>>>1 -> para listar os produtos"+
                "\n>>>2 -> para adicionar produtos no carrinho"+
                "\n>>>3 -> para remover produtos do carrinho"+
                "\n>>>4 -> para listar os produtos no carrinho"+
                "\n>>>5 -> para pagar os produtos no carrinho"+
                "\n>>>6 -> para solicitar a entrega de um pedido"+
                "\n>>>7 -> para listar os pedidos"
                );
          break;
        case 'listar-carrinho':
          const itensCarrinho = JSON.parse(dados.dados);
          let mensagem4 = "";
          let total = 0;

          itensCarrinho.forEach((produto) => {
            mensagem4 += 
              `IdCarrinho: ${produto.idCarrinho} \n`+
              `Produto: \n${`>>id: ${produto.produto.id} \n>>nome: ${produto.produto.nome} \n>>preço: ${produto.produto.preco}\n`}`+
              `Quantidade: ${produto.quantidade}\n\n`
            ;
            total += produto.produto.preco*produto.quantidade;
          });

          mensagem4 += `Total: ${total} \n`;

          if(itensCarrinho.length === 0){
            mensagem4 = "Carrinho vazio\n"
          }
          console.log(mensagem4);
          menuOption = "";
          isInMenu = true;
          console.log("Digite:"+
                "\n>>>1 -> para listar os produtos"+
                "\n>>>2 -> para adicionar produtos no carrinho"+
                "\n>>>3 -> para remover produtos do carrinho"+
                "\n>>>4 -> para listar os produtos no carrinho"+
                "\n>>>5 -> para pagar os produtos no carrinho"+
                "\n>>>6 -> para solicitar a entrega de um pedido"+
                "\n>>>7 -> para listar os pedidos"
                );
          break;
        case 'pagar':
          const mensagem5 = dados.dados;
          console.log(mensagem5);
          menuOption = "";
          isInMenu = true;
          console.log("Digite:"+
                "\n>>>1 -> para listar os produtos"+
                "\n>>>2 -> para adicionar produtos no carrinho"+
                "\n>>>3 -> para remover produtos do carrinho"+
                "\n>>>4 -> para listar os produtos no carrinho"+
                "\n>>>5 -> para pagar os produtos no carrinho"+
                "\n>>>6 -> para solicitar a entrega de um pedido"+
                "\n>>>7 -> para listar os pedidos"
                );
          break;
        case 'solicitar-entrega':
          const mensagem6 = dados.dados;
          console.log(mensagem6);
          menuOption = "";
          isInMenu = true;
          console.log("Digite:"+
                "\n>>>1 -> para listar os produtos"+
                "\n>>>2 -> para adicionar produtos no carrinho"+
                "\n>>>3 -> para remover produtos do carrinho"+
                "\n>>>4 -> para listar os produtos no carrinho"+
                "\n>>>5 -> para pagar os produtos no carrinho"+
                "\n>>>6 -> para solicitar a entrega de um pedido"+
                "\n>>>7 -> para listar os pedidos"
                );
          break;
        case 'listar-pedidos':
          const pedidos = JSON.parse(dados.dados);
          let mensagem7 = "";

          pedidos.forEach((pedido) => {
            let tempProdutos = "";
            let total = 0;
            pedido.produtos.forEach((produto, index) => {
              tempProdutos += 
                `>Produto ${index+1}: \n${`>>id: ${produto.produto.id} \n>>nome: ${produto.produto.nome} \n>>preço: ${produto.produto.preco}\n`}`+
                `>Quantidade: ${produto.quantidade}\n`
              ;
              total += produto.produto.preco*produto.quantidade;
            });
            mensagem7 += 
              `IdPedido: ${pedido.idPedido} \n\n`+
              `Produtos: \n${tempProdutos}\n`+
              `Total: ${total}\n`+
              `Status: ${pedido.status}\n\n`
            ;
          });

          if(pedidos.length === 0){
            mensagem7 = "Sem pedidos registrados\n"
          }
          console.log(mensagem7);
          menuOption = "";
          isInMenu = true;
          console.log("Digite:"+
                "\n>>>1 -> para listar os produtos"+
                "\n>>>2 -> para adicionar produtos no carrinho"+
                "\n>>>3 -> para remover produtos do carrinho"+
                "\n>>>4 -> para listar os produtos no carrinho"+
                "\n>>>5 -> para pagar os produtos no carrinho"+
                "\n>>>6 -> para solicitar a entrega de um pedido"+
                "\n>>>7 -> para listar os pedidos"
                );
          break;
      }
    } catch(e) {
        console.error(e);
    }
  }
})

console.log("Digite: (Espere aparecer Sem erro)"+
                "\n>>>1 -> para listar os produtos"+
                "\n>>>2 -> para adicionar produtos no carrinho"+
                "\n>>>3 -> para remover produtos do carrinho"+
                "\n>>>4 -> para listar os produtos no carrinho"+
                "\n>>>5 -> para pagar os produtos no carrinho"+
                "\n>>>6 -> para solicitar a entrega de um pedido"+
                "\n>>>7 -> para listar os pedidos"
                );

rl.on('line', line => {
  if(isInMenu){
    menuOption = line.trim();
    isInMenu = false;
    if(line.trim()==="1"){
      client.publish('listar-produtos', JSON.stringify({}));
    } else if(line.trim()==="2"){
      console.log("Digite a id do produto e a quantidade dele, separadas por virgula: Ex: 1, 3");
    } else if(line.trim()==="3"){
      console.log("Digite a id no carrinho do produto a ser removido do carrinho");
    } else if(line.trim()==="4"){
      client.publish('listar-carrinho', JSON.stringify({}));
    } else if(line.trim()==="5"){
      client.publish('pagar', JSON.stringify({}));
    } else if(line.trim()==="6"){
      console.log("Digite a id do pedido para solicitar a entrega");
    } else if(line.trim()==="7"){
      client.publish('listar-pedidos', JSON.stringify({}));
    } else {
      menuOption = "";
      isInMenu = true;
      console.log("Você digitou uma opção inválida");
    }
  } else {
    if(menuOption==="2"){
      const params = line.split(",");

      client.publish('adicionar-carrinho', JSON.stringify({ "id": params[0], "quantidade": params[1] }));
    } else if(menuOption==="3"){
      const params = line.split(",");

      client.publish('remover-carrinho', JSON.stringify({ "id": params[0] }));
    } else if(menuOption==="6"){
      const params = line.split(",");

      client.publish('solicitar-entrega', JSON.stringify({ "id": params[0] }));
    }
  }
});