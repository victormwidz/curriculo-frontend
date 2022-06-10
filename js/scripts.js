const API_URL = "http://localhost:8080"

const portfolio = {
    menuLinks: function() {
        const buttons = document.querySelectorAll('.btn-link')

        buttons.forEach(button => {
            button.addEventListener('click', function() {
        
                const classeparamostrar = button.textContent.toLowerCase()
        
                document.querySelectorAll('section').forEach(section => {
                    section.classList.add('escondido')
                })
        
                buttons.forEach(buttonitem => {
                    buttonitem.classList.remove('negrito')
                })
                button.classList.add('negrito')
        
                document.querySelector('.'+ classeparamostrar).classList.remove('escondido')
            })
        });
    },

    carregaRecados: async function () {
        const response = await fetch(`${API_URL}/recados`);
        const recados = await response.json();

        portfolio.mostraRecados(recados)
    },

    mostraRecados: function (recados) {
        const tableBody = document.getElementById('table-body')
        tableBody.innerHTML = ''
 
        recados.map((recado) => {
            const html_recado = `
                <tr class="table-active" method="post">
                    <td>${recado.id}</td>
                    <td>${recado.nome}</td>
                    <td>${recado.recado}</td>
                </tr>
            `
            tableBody.insertAdjacentHTML('beforeend', html_recado)     
        })
    },

    inserirRecado: async function(event) {
        event.preventDefault();
        const nome = document.getElementById('register-descrition').value
        const recado = document.getElementById('register-details').value
        
        const novoRecado = {
            nome,
            recado
        };
        
        const resposta = await fetch(`${API_URL}/recados`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(novoRecado)
        });

        if (resposta.status === 200) {
            setTimeout(() => {
                portfolio.carregaRecados()
            }, 2000)
        }
    },

    init: function() {
        portfolio.menuLinks()
        portfolio.carregaRecados()
    }
}

const contato = {
    submitContato: async function(event) {
        event.preventDefault();
        const nome = document.getElementById('contato-nome').value
        const telefone = document.getElementById('contato-telefone').value
        const email = document.getElementById('contato-email').value
        
        const novoContato = {
            nome,
            telefone,
            email
        };
        
        const resposta = await fetch(`${API_URL}/contatos`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(novoContato)
        });

        if (resposta.status === 200) {
            document.querySelector('.formulario-contato').reset()
            document.querySelector('.mensagem-successo').classList.remove('escondido')

            setTimeout(() => {
                document.querySelector('.mensagem-successo').classList.add('escondido')
            }, 4000)
        }
    },
    init: function() {
    }
}

portfolio.init()
contato.init()