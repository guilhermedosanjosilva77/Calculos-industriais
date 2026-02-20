from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/mediaPonderada", methods=['POST'])
def calcular_media():
    dados=request.json
    preco = int(dados.get("n1"))
    qualidade = int(dados.get("n2"))
    tempo_entrega=int(dados.get("n3"))

    media_geral =((preco * 0.4) + (qualidade * 0.35) + (tempo_entrega * 0.25)) / (0.4 + 0.35 + 0.25)
    return jsonify ({'media_geral':media_geral})    

@app.route("/api/jurosComposto", methods =['POST'])
def calcular_juros():
    dados=request.json
    p = float(dados.get("p"))
    i = float(dados.get("i"))
    n=float(dados.get("n"))

    if(i > 8):
        return print("Taxa de juros não pode ser maior que 8%")
    montante = p * (1+i) **n
    return jsonify ({'montante':montante})





if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5050 , debug=True, use_reloader=False)