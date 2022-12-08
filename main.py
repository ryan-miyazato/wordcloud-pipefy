import requests
import json
import sys

idMaquina = sys.argv[1]

def pegarChamados():
    url = "https://api.pipefy.com/graphql"
    payload = {
        "query": "query{   phase(id:317658683){     cards{       edges{         node{           id  title         }       }     }   } }"}
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIyMTE4NDUsImVtYWlsIjoiMjIyLTFjY28tZ3J1cG84QGJhbmR0ZWMuY29tLmJyIiwiYXBwbGljYXRpb24iOjMwMDIxNjM0N319.jSLkT6f8zxLjfQSM9v033CcMIIOfldcJ9pvqaS8Hwy-XV2T9i7tdf-sB7-ndq-vOp-TtQFbh4BFj5Oy4juZDYQ"
    }
    response = requests.post(url, json=payload, headers=headers)
    return json.loads(response.text)["data"]["phase"]["cards"]["edges"]

def tratarChamados():
    chamados = pegarChamados()

    for chamado in chamados:
        atualChamado = chamado["node"]["title"].split()
        alerta = atualChamado[10] + " " + atualChamado[11] + " " + atualChamado[12] + " " + atualChamado[13] + " " + atualChamado[14]
        print(alerta)

tratarChamados()