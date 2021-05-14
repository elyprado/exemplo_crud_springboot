
var idatual = 0;
var modalCadastro;
var modalAlerta;
var modalExcluir;

window.onload = function(e) {
    listar();
}

function sair() {
    sessionStorage.setItem('meutoken', undefined);
 	window.location.href = "index.html";
}

function listar() {
    //limpar tabela
    var tab = document.getElementById("tabela");
    for (var i=tab.rows.length -1; i>0; i--) {
        tab.deleteRow(i);
    }
    
    //if (sessionStorage.getItem('meutoken') == undefined) {
    //	alert("Permissão negada");
    //	 window.location.href = "index.html";
    //	 return;
    //}
    
    var myHeaders = new Headers();
	myHeaders.append("AUTHORIZATION", "Bearer " + sessionStorage.getItem('meutoken'));

    fetch("http://localhost:8080/agendamento", {method: "GET", headers: myHeaders})
    .then(response => response.json())
    .then(data => {
        for (const item of data) {
        
            var tab = document.getElementById("tabela");
            var row = tab.insertRow(-1);
            row.insertCell(-1).innerHTML = item.data;
            row.insertCell(-1).innerHTML = item.horario;
            row.insertCell(-1).innerHTML = item.nomePaciente;
            row.insertCell(-1).innerHTML = item.telefonePaciente;
            row.insertCell(-1).innerHTML = item.valorConsulta;
            row.insertCell(-1).innerHTML = "<button type='button' class='btn btn-primary' "
            + " onclick='alterar("+item.idagendamento+")'> "
            + "<i class='bi bi-pencil'></i></button>"
            + "<button type='button' class='btn btn-danger' "
            + " onclick='excluir("+item.idagendamento+")'> "
            + "<i class='bi bi-trash'></i></button>";
        }
    })
    .catch(error => console.log("Erro", error));


}

function novo() {
    idatual = 0;
    document.getElementById("txtData").value = "";
    document.getElementById("txtHorario").value = "";
    document.getElementById("txtNomePaciente").value = "";
    document.getElementById("txtTelefonePaciente").value = "";
    document.getElementById("txtValorConsulta").value = "";

    

    modalCadastro = new bootstrap.Modal(document.getElementById("modalCadastro"));
    modalCadastro.show();
}
function alterar(id) {
    idatual = id;
    
    var myHeaders = new Headers();
	myHeaders.append("AUTHORIZATION", "Bearer " + sessionStorage.getItem('meutoken'));
    

    fetch("http://localhost:8080/agendamento/"+idatual, {method: "GET", headers: myHeaders})
    .then(response => response.json())
    .then(data => {
        
        document.getElementById("txtData").value = data.data;
	    document.getElementById("txtHorario").value = data.horario;
	    document.getElementById("txtNomePaciente").value = data.nomePaciente;
	    document.getElementById("txtTelefonePaciente").value = data.telefonePaciente;
	    document.getElementById("txtValorConsulta").value = data.valorConsulta;
        
 
        
        modalCadastro = new bootstrap.Modal(document.getElementById("modalCadastro"));
        modalCadastro.show();
        
    })
    .catch(error => console.log("Erro", error));

}
function excluir(id) {
    idatual = id;
    document.getElementById("modalAlertaBody").style.backgroundColor = "#FFFFFF";
    document.getElementById("modalAlertaBody").innerHTML = "<h5>Confirma a exclusão do registro? </h5>"
    + '<button type="button" class="btn btn-primary" onclick="excluirSim()">Sim</button>'
    + '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>';
    modalExcluir = new bootstrap.Modal(document.getElementById("modalAlerta"));
    modalExcluir.show();
}
function excluirSim() {
	var myHeaders = new Headers();
	myHeaders.append("AUTHORIZATION", "Bearer " + sessionStorage.getItem('meutoken'));


    fetch("http://localhost:8080/agendamento/" + idatual, {method: "DELETE", headers: myHeaders})
    .then(response => {
        const status = response.status;
        modalExcluir.hide();
        listar();
        if (status==200) {
            mostrarAlerta("Registro excluído com sucesso!", true);
        } else {
            mostrarAlerta("Falha ao excluir registro!", false);
        }
    })
    .catch(error => console.log("Erro", error));
}

function salvar() {
    var p = {
        idagendamento: idatual,
        data: document.getElementById("txtData").value,
        horario: document.getElementById("txtHorario").value,
        nomePaciente: document.getElementById("txtNomePaciente").value,
        telefonePaciente: document.getElementById("txtTelefonePaciente").value,
        valorConsulta: parseFloat(document.getElementById("txtValorConsulta").value)
    };

    var json = JSON.stringify(p);
    
    console.log(json);

    var url;
    var metodo;
    if (idatual==0) {
        url = "http://localhost:8080/agendamento";
        metodo = "POST";
    } else {
        url = "http://localhost:8080/agendamento/" + idatual;
        metodo = "PUT";
    }
    
    var myHeaders = new Headers();
	myHeaders.append("AUTHORIZATION", "Bearer " + sessionStorage.getItem('meutoken'));
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    
    fetch(url, {method: metodo, body: json, redirect: 'follow', headers: myHeaders}) 
    .then(response => response.json())
    .then(result => {
        if (result.idagendamento>0) {
            mostrarAlerta("Cadastro Efetuado com Sucesso", true);
            modalCadastro.hide();
            listar();
        } else {
            mostrarAlerta("Falha ao inserir dados", false);
        }
    });

}

function mostrarAlerta(msg, success) {
    if (success) {
        document.getElementById("modalAlertaBody").style.backgroundColor = "#E0F2F1";
    } else {
        document.getElementById("modalAlertaBody").style.backgroundColor = "#FFEBEE";
    }
    document.getElementById("modalAlertaBody").innerHTML = msg;
    modalAlerta = new bootstrap.Modal(document.getElementById("modalAlerta"));
    modalAlerta.show();
    window.setTimeout(function() {
        modalAlerta.hide();
    }, 3000);
}