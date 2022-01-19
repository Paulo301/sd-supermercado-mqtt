var mqtt = require('mqtt');
var server  = mqtt.connect('mqtt://test.mosquitto.org');

const bdProdutos = [
  {
    id: 0,
    nome: "Pão",
    preco: 4
  },
  {
    id: 1,
    nome: "Suco",
    preco: 5
  },
  {
    id: 2,
    nome: "Arroz",
    preco: 20.50
  },
  {
    id: 3,
    nome: "Feijão",
    preco: 9.90
  },
  {
    id: 4,
    nome: "Farinha de trigo",
    preco: 3.15
  }
];
let carrinho = [];
let pedidos = [];

server.on('connect', () => {
  server.subscribe('listar-produtos', (err) => {
    if (!err) {
      console.log("sem erro");
    }
  });
  server.subscribe('adicionar-carrinho', (err) => {
    if (!err) {
      console.log("sem erro");
    }
  });
  server.subscribe('remover-carrinho', (err) => {
    if (!err) {
      console.log("sem erro");
    }
  });
  server.subscribe('listar-carrinho', (err) => {
    if (!err) {
      console.log("sem erro");
    }
  });
  server.subscribe('pagar', (err) => {
    if (!err) {
      console.log("sem erro");
    }
  });
  server.subscribe('solicitar-entrega', (err) => {
    if (!err) {
      console.log("sem erro");
    }
  });
  server.subscribe('listar-pedidos', (err) => {
    if (!err) {
      console.log("sem erro");
    }
  });
});

server.on('message', function (topic, message) {
  const dados = JSON.parse(message.toString());

  switch(topic){
    case 'listar-produtos':
      server.publish('sistema', JSON.stringify({funcao: 'listar-produtos', dados: JSON.stringify(bdProdutos)}));
      break;
    case 'adicionar-carrinho':
      const tempProduto = bdProdutos.find((produto) => produto.id === Number(dados.id));
      if(tempProduto){
        const tam = carrinho.length;
        carrinho.push(
          {
            idCarrinho: tam ? carrinho[tam - 1].idCarrinho + 1 : 0,
            produto: tempProduto,
            quantidade: Number(dados.quantidade)
          }
        );
        server.publish(
          'sistema', 
          JSON.stringify(
            {
              funcao: 'adicionar-carrinho', 
              dados: "Produto adicionado com sucesso!\n"
            }
          )
        );
      } else{
        server.publish(
          'sistema', 
          JSON.stringify(
            {
              funcao: 'adicionar-carrinho', 
              dados: "Id inválida\n"
            }
          )
        );
      }
      break;
    case 'remover-carrinho':
      const tempProduto2 = carrinho.find((produto) => produto.idCarrinho === Number(dados.id));
      if(tempProduto2){
        const tempCarrinho = carrinho.filter((produto) => produto.idCarrinho !== Number(dados.id));
        carrinho = tempCarrinho;
        server.publish(
          'sistema', 
          JSON.stringify(
            {
              funcao: 'remover-carrinho', 
              dados: "Produto removido com sucesso\n"
            }
          )
        );
      } else {
        server.publish(
          'sistema', 
          JSON.stringify(
            {
              funcao: 'remover-carrinho', 
              dados: "Id inválida\n"
            }
          )
        );
      }
      break;
    case 'listar-carrinho':
      server.publish('sistema', JSON.stringify({funcao: 'listar-carrinho', dados: JSON.stringify(carrinho)}));
      break;
    case 'pagar':
      if(carrinho.length){
        const tam = pedidos.length;
        pedidos.push(
          {
            idPedido: tam ? pedidos[tam - 1].idPedido + 1 : 0,
            produtos: carrinho.map((produto) => {
              const {idCarrinho, ...resto} = produto;
              return {...resto};
            }),
            status: "Pago"
          }
        );
        carrinho = [];
        server.publish(
          'sistema', 
          JSON.stringify(
            {
              funcao: 'pagar', 
              dados: "Pedido pago com sucesso!\n"
            }
          )
        );
      } else {
        server.publish(
          'sistema', 
          JSON.stringify(
            {
              funcao: 'pagar', 
              dados: "O carrinho está vazio\n"
            }
          )
        );
      }
      break;
    case 'solicitar-entrega':
      const tempPedido = pedidos.find((pedido) => pedido.idPedido === Number(dados.id));
      if(tempPedido){
        const tempPedidos = pedidos.map((pedido) => {
          if(pedido.idPedido === Number(dados.id)){
            return {...pedido, status: "Entrega solicitada"}
          } else{
            return pedido;
          }
        });
        pedidos = tempPedidos;
        server.publish(
          'sistema', 
          JSON.stringify(
            {
              funcao: 'solicitar-entrega', 
              dados: "Entrega solicitada com sucesso\n"
            }
          )
        );
      } else {
        server.publish(
          'sistema', 
          JSON.stringify(
            {
              funcao: 'solicitar-entrega', 
              dados: "Id inválida\n"
            }
          )
        );
      }
      break;
    case 'listar-pedidos':
      server.publish('sistema', JSON.stringify({funcao: 'listar-pedidos', dados: JSON.stringify(pedidos)}));
      break;
  }
});