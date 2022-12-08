const fs = require('fs');
const path = require('path');
const spawn = require("child_process").spawn;
const exec = require("child_process").exec;

function executarPython(servidor){
    exec(`python /home/aluno/Music/wordcloud-pipefy/main.py "${servidor}"`, function(error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error != null) {
            console.log('exec error: ' + error);
        } else {
            console.log("foi")
            tratarJson(stdout)
        }
    });   
}


function tratarJson(jsonString){
    var palavras = jsonString.split(" ")

    for(var i = 0; i < palavras.length; i++){
        palavras[i] = palavras[i].replace(/'/g, '"')
        // console.log(palavras[i])
    }

    var jsonTratado = JSON.parse(palavras.join(" ")) 
    calcularFrequencia(jsonTratado)
    // console.log(jsonTratado)
}

function calcularFrequencia(jsonTratado){
    console.log(jsonTratado);
    var chamados = jsonTratado.chamados;
    var chamadosFreq = []

    var memoria = []
    
    for(var i = 0; i < chamados.length; i++){
        var count = 1
        var alerta1 = chamados[i]
        
        if(memoria.indexOf(alerta1)>=0){
            continue;
        }

        for(var j = i+1; j < chamados.length; j++){
            var alerta2 = chamados[j]
            
            if(alerta1 == alerta2){
                count++;
                memoria.push(alerta1);
            }

        }

        chamadosFreq.push({"alerta": alerta1, "frequencia": count}) 
    }

    wordcloud(chamadosFreq)
}


