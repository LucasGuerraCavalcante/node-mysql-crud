
//  HTML que será visível apenas se apretarem no botão de "opcoes"

areaOpcoes =
    '<div class="row" style="text-align:center;">\n' +
        '<div class="col-md-6">\n' +
            '<form class="" action="/excluir" method="GET">\n' +
                '<button type="submit" id="btn-excluir" class="btn btn-block"><i class="fas fa-trash"></i> Excluir </button>\n' +
            '</form>\n' +
        '</div>\n' +
        '<div class="col-md-6">\n' +
            '<form class="" action="/excluir" method="GET">\n' +
                '<button type="submit" id="btn-editar" class="btn btn-block"><i class="fas fa-magic"></i> Editar </button>\n' +
            '</form>\n' +
        '</div>\n' +
    '</div>'

var clicks = 0;

// Função para aparecer e ocultar as opcoes

function btnOpcoes() {
    clicks = clicks + 1

    if (clicks == 1) {
        document.getElementById("area-opcoes").innerHTML = areaOpcoes;
    } else if (clicks == 2) {
        document.getElementById("area-opcoes").innerHTML = "";
        clicks = 0
    }
} 