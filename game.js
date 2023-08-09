let quentinhas = 0;
let grana = 0;
let ganhoQuentinha = 1;
let ganhoPorVenda = 1;  // Valor por quentinha ao vender

let intervaloQuentinhas = setInterval(() => {
    quentinhas += ganhoQuentinha;
    document.getElementById('quentinhas').textContent = "Quentinhas: " + quentinhas;
}, 10000);

function venderQuentinhas() {
    grana += quentinhas * ganhoPorVenda; // Multiplica quentinhas pelo ganhoPorVenda
    quentinhas = 0;
    document.getElementById('quentinhas').textContent = "Quentinhas: " + quentinhas;
    document.getElementById('grana').textContent = "Grana: " + grana;
}

document.getElementById('produzirQuentinha').addEventListener('click', function() {
    quentinhas += ganhoQuentinha;
    document.getElementById('quentinhas').textContent = "Quentinhas: " + quentinhas;
});

document.getElementById('goToShop').addEventListener('click', function() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('loja').style.display = 'block';
    document.getElementById('granaLoja').textContent = "Grana: " + grana;
});

document.getElementById('goToRestaurant').addEventListener('click', function() {
    document.getElementById('loja').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

document.getElementById('venderQuentinha').addEventListener('click', venderQuentinhas);

document.querySelectorAll('.itemLoja').forEach(function(button) {
    button.addEventListener('click', function() {
        let custo = parseInt(this.dataset.custo);
        if (grana >= custo) {
            grana -= custo;
            document.getElementById('grana').textContent = "Grana: " + grana;
            document.getElementById('granaLoja').textContent = "Grana: " + grana;
            
            switch(this.textContent) {
                case "Caixa registradora":
                    ganhoPorVenda = 2;  // Atualiza o valor de venda por quentinha para 2
                    alert('Você comprou uma ' + this.textContent + ' por ' + custo + ' grana! Agora, você vende cada quentinha por 2 grana.');
                    break;
                // Resto dos casos
            }
        } else {
            alert('Você não tem grana suficiente para comprar este item!');
        }
    });
});

document.getElementById('iniciarJogo').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

document.getElementById('apagarDados').addEventListener('click', function() {
    if(confirm("Você tem certeza? Todos os dados serão perdidos!")) {
        location.reload();
    }
});

document.getElementById('iniciarJogo').addEventListener('click', function() {
    let nomeRestaurante = prompt("Por favor, insira o nome do seu restaurante:", "Seu Restaurante");
    if (nomeRestaurante !== null && nomeRestaurante !== "") {
        document.querySelector('#game h2').textContent = nomeRestaurante;
    }
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

