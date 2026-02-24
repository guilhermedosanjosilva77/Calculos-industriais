async function CalcularMedia(){
    
    const n1 = document.getElementById('n1').value
    const n2 = document.getElementById('n2').value
    const n3 = document.getElementById('n3').value

    const response = await fetch("api/mediaPonderada ",{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            n1:n1,
            n2:n2,
            n3:n3

        })
    })


    const data = await response.json();
    document.getElementById('resultado_geral').innerHTML = `${data.media_geral}`
  

    }

async function CalcularMontante() {

    const p =document.getElementById('p').value
    const i =document.getElementById('i').value
    const n =document.getElementById('n').value

    const response = await fetch ("/api/jurosComposto" ,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            p:p,
            i:i,
            n:n
        })

    })

    const data = await response.json()
    document.getElementById('resultado_final').innerHTML = `${data.montante}`

    if(n > 8){
        alert("Taxa de juros não pode ser maior que 8%")
        document.getElementById('resultado_final').innerHTML = `0`

    }
    
}
async function ControladorCLP(){
    const intensidade = document.getElementById('intensidade').value  

   


    const response = await fetch("/api/SensoresIndustriais",{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            intensidade:intensidade
        })
    })
    const data = await response.json()
    document.getElementById('resultado').innerHTML =`Binário:${data.resultado}`

     if(intensidade <0 || intensidade > 255){
        alert(data.erro1)

    }

    if( intensidade > 230 &&  intensidade<=255 ){
        alert(data.erro)
        document.getElementById('resultado').innerHTML = `${data.resultado}`

       

    }


    
}
async function Conversao(tipo) {
    const celsius=document.getElementById('celsius').value
    const kelvin=document.getElementById('kelvin').value
    const far=document.getElementById('far').value

    const response = await fetch ("/api/conversaoTemperaturas",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            celsius:celsius,
            far:far,
            kelvin:kelvin
        })
    })
    const data = await response.json()

    switch (tipo){
        case 1:
            document.getElementById('resultado').innerHTML=`Conversão bem sucedida resultado = ${data.celsius_parafar} F`
            break;
    }
    
}


    
