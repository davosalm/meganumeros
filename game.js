document.addEventListener("DOMContentLoaded", function() {

    let quentinhas = 0;
    let grana = 0;
    let ganhoQuentinha = 1;
    let pizzas = 0;
    let valorQuentinha = 1;
    let intervaloProducao = 10000;
    let cozinheiros = 0;

    function producaoAutomatica() {
        quentinhas += ganhoQuentinha;
        document.getElementById('quentinhas').textContent = "Quentinhas: " + quentinhas;
        setTimeout(producaoAutomatica, intervaloProducao);
    }

document.querySelectorAll('.info').forEach(function(span) {
    span.addEventListener('click', function() {
        let descricao;
        switch (span.previousElementSibling.textContent) {
            case "Frigideira de Inox":
                descricao = "Dobra a quantidade de quentinhas por clique.";
                break;
            case "Frigideira de Aço Cirúrgico":
                descricao = "Permite a produção de 4 quentinhas por clique.";
                break;
            case "Forno a Lenha":
                descricao = "Permite a produção e venda de pizzas.";
                break;
            case "Caixa registradora":
                descricao = "Dobra o valor de venda de cada quentinha.";
                break;
            case "Cozinheiro":
                descricao = "Aumenta a produção automática de quentinhas.";
                break;
            case "The Bear":
                descricao = "Produz mais 10 quentinhas automaticamente a cada segundo.";
                break;
        }
        alert(descricao);
    });
});

    document.getElementById('iniciarJogo').addEventListener('click', function() {
        const nomeRestaurante = prompt('Qual é o nome do seu restaurante?');
        if (nomeRestaurante) {
            document.querySelector('h2').textContent = nomeRestaurante;
        }
        document.getElementById('menu').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        producaoAutomatica();
    });

    document.getElementById('produzirQuentinha').addEventListener('click', function() {
        quentinhas += ganhoQuentinha;
        document.getElementById('quentinhas').textContent = "Quentinhas: " + quentinhas;
    });

    document.getElementById('venderQuentinha').addEventListener('click', function() {
        grana += quentinhas * valorQuentinha;
        quentinhas = 0;
        document.getElementById('quentinhas').textContent = "Quentinhas: " + quentinhas;
        document.getElementById('grana').textContent = "Grana: " + grana;
    });

    document.getElementById('goToShop').addEventListener('click', function() {
        document.getElementById('game').style.display = 'none';
        document.getElementById('loja').style.display = 'block';
    });

    document.getElementById('goToRestaurant').addEventListener('click', function() {
        document.getElementById('loja').style.display = 'none';
        document.getElementById('game').style.display = 'block';
    });

    document.querySelectorAll('.itemLoja').forEach(function(button) {
        button.addEventListener('click', function() {
            let custo = parseInt(this.dataset.custo);
            if (grana >= custo) {
                grana -= custo;
                document.getElementById('grana').textContent = "Grana: " + grana;

                switch (this.textContent) {
                    case "Frigideira de Inox":
                        ganhoQuentinha *= 2;
                        document.getElementById('itensComprados').innerHTML += "🍳 Frigideira de Inox<br>";
                        this.style.display = 'none';
                        document.querySelector('[data-custo="750"] + .custo').style.display = 'none'; 
                        // Mostra Frigideira de Aço Cirúrgico
                        document.querySelector('[data-custo="3500"]').style.display = 'block';
                        document.querySelector('[data-custo="3500"] + .custo').style.display = 'block'; 
                        break;
                    case "Frigideira de Aço Cirúrgico":
                        ganhoQuentinha = 4;
                        document.getElementById('itensComprados').innerHTML += "🍳 Frigideira de Aço Cirúrgico<br>";
                        this.style.display = 'none';
                        document.querySelector('[data-custo="3500"] + .custo').style.display = 'none'; 
                        break;
                    case "Forno a Lenha":
                        document.getElementById('itensComprados').innerHTML += "🍕 Forno a Lenha<br>";
                        document.getElementById('produzirPizza').style.display = "block";
                        document.getElementById('venderPizza').style.display = "block";
                        this.style.display = 'none';
                        document.querySelector('[data-custo="10000"] + .custo').style.display = 'none'; 
                        break;
                    case "Caixa registradora":
                        valorQuentinha = 2;
                        document.getElementById('precoQuentinha').textContent = "Preço por quentinha: 2 grana";
                        document.getElementById('itensComprados').innerHTML += "💰 Caixa registradora<br>";
                        this.style.display = 'none';
                        document.querySelector('[data-custo="300"] + .custo').style.display = 'none';
                        break;
                    case "Cozinheiro":
                        if (cozinheiros < 9) {
                            cozinheiros++;
                            intervaloProducao -= 1000;
                            document.getElementById('prodQuentinhaPorSeg').textContent = `Produção automática: 1 quentinha/${intervaloProducao/1000}s`;
                            document.getElementById('itensComprados').textContent = "👨‍🍳 Cozinheiro x" + cozinheiros; 
                            if (cozinheiros === 9) {
                                document.querySelector('[data-custo="8000"]').style.display = 'block';
                                document.querySelector('[data-custo="8000"] + .custo').style.display = 'block'; 
                                document.querySelector('[data-custo="80"] + .custo').style.display = 'none';
                            }
                        } else {
                            alert('Você já tem o máximo de cozinheiros!');
                        }
                        break;
                    case "The Bear":
                        ganhoQuentinha += 8;
                        document.getElementById('itensComprados').innerHTML += "🐻 The Bear<br>";
                        this.style.display = 'none';
                        document.querySelector('[data-custo="8000"] + .custo').style.display = 'none';
                        alert('Yes, Chef!');
                        break;
                }
            } else {
                alert('Você não tem grana suficiente para comprar este item!');
            }
        });
    });
});
