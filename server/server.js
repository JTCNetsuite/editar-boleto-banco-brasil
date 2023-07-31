const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());


app.post("/editarboleto", (req, res) => {
    console.log("body", req.body);
    const data = req.body;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");   
    myHeaders.append("Authorization", data.authObj);
    myHeaders.append("Cookie", "49dcc057421d66c921b9cd0221ea1d49=fc3c82af4ab7d065cc1b686c9b5ad12b; 49dcc057421d66c921b9cd0221ea1d49=fc3c82af4ab7d065cc1b686c9b5ad12b");
    

    var raw = JSON.stringify({
        "numeroConvenio": 3128557,
        "indicadorNovaDataVencimento": "N",
        "indicadorAtribuirDesconto": "N",
        "indicadorAlterarDesconto": "N",
        "indicadorAlterarDataDesconto": "N",
        "indicadorProtestar": "N",
        "indicadorSustacaoProtesto": "N",
        "indicadorCancelarProtesto": "N",
        "indicadorIncluirAbatimento": "S",
        "abatimento": {
            "valorAbatimento": 0.1
        },
        "indicadorAlterarAbatimento": "N",
        "alteracaoAbatimento": {
            "novoValorAbatimento": 0
        },
        "indicadorCobrarJuros": "N",
        "juros": {
            "tipoJuros": 0,
            "valorJuros": 0,
            "taxaJuros": 0
        },
        "indicadorDispensarJuros": "N",
        "indicadorCobrarMulta": "N",
        "multa": {
            "tipoMulta": 2,
            "valorMulta": 0,
            "dataInicioMulta": "25.12.2023",
            "taxaMulta": 10
        },
        "indicadorDispensarMulta": "N",
        "indicadorAlterarSeuNumero": "N",
        "indicadorAlterarEnderecoPagador": "N",
        "indicadorAlterarPrazoBoletoVencido": "N"

    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        // redirect: 'follow'
    };
    fetch(data.url, requestOptions)
        .then(response => {
            console.log(response.json())
        })
        .then(result =>  res.send(result))
        .catch(error => console.log('error', error));
})




app.listen(8000, () => {
    console.log("server is running");
    
})