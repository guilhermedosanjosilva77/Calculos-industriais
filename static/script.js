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


    
