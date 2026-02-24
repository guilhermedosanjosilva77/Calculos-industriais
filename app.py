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

@app.route("/api/SensoresIndustriais", methods =['POST'])
def calcular_valores():
    dados=request.json
    intensidade = int(dados.get("intensidade"))
    resultado = format(int(intensidade),'08b')

    if(intensidade < 0 or intensidade > 255):
        return jsonify({"erro1":"ERROR!"})
    
    if(intensidade > 230 and intensidade <=255):
        return jsonify({
            'resultado':resultado,
            'erro':"ERRO: Sinais luminosos muito alto, convém fazer alterações no aparelho"

        })
    
    return jsonify({'resultado':resultado})

@app.route("/api/conversaoTemperaturas", methods = ['POST'])
def conversaoTemperaturas():
    dados=request.json
    celsius = float(dados.get('celsius'))
    kelvin=float(dados.get('kelvin'))
    far=float(dados.get('far'))

    celsius_para_far=float(((9/5)*celsius) + 32)
    far_para_celsius=(5/9)*(far-32)
    celsius_para_kelvin=celsius+273.15
    kelvin_para_celsius=kelvin-273.15

    return jsonify({'celsius_parafar':celsius_para_far,'far_para_celsius':far_para_celsius,'celsius_para_kelvin':celsius_para_kelvin,
                    'kelvin_para_celsius':kelvin_para_celsius})

    








if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5050 , debug=True, use_reloader=False)