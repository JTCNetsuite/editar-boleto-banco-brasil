/**
 * @NAPIVersion 2.x
 * @NModuleScope public
 */

import { contants as cts } from '../module/jtc_editar_boleto_CTS';
import * as log from "N/log";
import { Form } from "N/ui/serverWidget";
import * as record from 'N/record';
import * as https from  'N/https';
import * as http from 'N/http';

export const createButton = (form: Form, fncName: string) => {
    try {
        

        form.clientScriptModulePath = '../controllers/jtc_func_editar_boleto_CS.js'

        const btn = form.addButton({
            id: cts.FORM.BTN_EDITRAR.ID,
            label: cts.FORM.BTN_EDITRAR.LABEL,
            functionName: fncName
        });


    } catch (error) {
        log.error("jtc_editar_boleto_MSR.createButton", error);
    }
}



export const editarBoleto = (idTransaction) => {
    try {
        const op = window.prompt(
            "A - Lançar abatimento no valor do boleto \n" +
            "B - alterar valor do boleto \n" +
            "C - alterar taxa de juros do boleto \n"
        );
        console.log(op);

        switch (op) {
            case "A":
                abatimentoNoValorBoleto(idTransaction);
                break;
            case "B":
                alterarValorBoleto(idTransaction);
                break;
            case "C":
                alterarTaxaJurosBoleto();
                break;
            default:
                alert("Valor inválido, tente novamente!");
                break;
        }


    } catch (error) {
        log.error("jtc_editar_boleto_MSR.editarBoleto", error);
    }
}

const getAccessToken = () =>{
    try {
        const url = "https://oauth.hm.bb.com.br/oauth/token";
        const authorization = "Basic ZXlKcFpDSTZJalZsTWpnMFltUXRNeUlzSW1OdlpHbG5iMUIxWW14cFkyRmtiM0lpT2pBc0ltTnZaR2xuYjFOdlpuUjNZWEpsSWpvMU5qRTRNaXdpYzJWeGRXVnVZMmxoYkVsdWMzUmhiR0ZqWVc4aU9qRjk6ZXlKcFpDSTZJbUV4TnpNMU9EY3RZbVl5TlMwMFlXTWlMQ0pqYjJScFoyOVFkV0pzYVdOaFpHOXlJam93TENKamIyUnBaMjlUYjJaMGQyRnlaU0k2TlRZeE9ESXNJbk5sY1hWbGJtTnBZV3hKYm5OMFlXeGhZMkZ2SWpveExDSnpaWEYxWlc1amFXRnNRM0psWkdWdVkybGhiQ0k2TVN3aVlXMWlhV1Z1ZEdVaU9pSm9iMjF2Ykc5bllXTmhieUlzSW1saGRDSTZNVFkzTnpjMk1UUTFPVE13TVgw";

        
        
    
        const bodyObj = {   
            "grant_type": "client_credentials",
            "scope": "cobrancas.boletos-info cobrancas.boletos-requisicao"
        };
        
        const headers = {};
        headers['Authorization'] = authorization;
        headers['Accept'] = 'application/json';
        const response = https.post({
            url: url,
            headers: headers,
            body: bodyObj
        });

        // console.log(response.body);
        return response.body;


    } catch (error) {
        console.log("jtc_editar_boleto_MSR.getAccessToken",error);
    }
}


const payLoad = () => {
    return {
        "numeroConvenio": 3128557,
        "indicadorNovaDataVencimento": "N",
        "indicadorAtribuirDesconto": "N",
        "indicadorAlterarDesconto": "N",
        "indicadorAlterarDataDesconto": "N",
        "indicadorProtestar": "N",
        "indicadorSustacaoProtesto": "N",
        "indicadorCancelarProtesto": "N",
        "indicadorIncluirAbatimento": "N",
        "abatimento": {
            "valorAbatimento": 0
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

    }

}


const requestEditarBoleto = (url, body, authObj) => {
    try {
        
        const requestBody = {
            // body_req: body,
            url: url, 
            authObj: authObj
        };


        // console.log(requestBody);
        return fetch('http://localhost:8000/editarboleto', {
            body: JSON.stringify(requestBody),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            return result;
        });


    } catch(e) {
        console.log(e);
    }
    

}



const abatimentoNoValorBoleto = (idTransaction) => {
    const body = payLoad();
    body.indicadorAlterarAbatimento = "S";
    
    const valor_do_abatimento = Number(window.prompt("Digite o valor do abatimento: "));
    
    body.alteracaoAbatimento.novoValorAbatimento = valor_do_abatimento;

    console.log("valor abatimento", body.abatimento.valorAbatimento);


    if (!valor_do_abatimento) {
        alert("Digite um valor");
        editarBoleto(idTransaction);
    } else {
        console.log(valor_do_abatimento);
        const token = JSON.parse(getAccessToken());
        console.log(token);

        const customRecordCnabParcela = record.load({
            type: cts.CNAB_AUXLIAR_PARCELA.ID,
            id: idTransaction
        });


        customRecordCnabParcela.setValue({ fieldId: cts.CNAB_AUXLIAR_PARCELA.VALOR_ABATIMENTO, value: valor_do_abatimento });

        const valorOriginal = Number(customRecordCnabParcela.getValue(cts.CNAB_AUXLIAR_PARCELA.VALOR_ORGINAL));


        const valor_atual = valorOriginal - valor_do_abatimento;

        customRecordCnabParcela.setValue({ fieldId: cts.CNAB_AUXLIAR_PARCELA.VALOR_ATUAL, value: valor_atual });

        const url = "https://api.hm.bb.com.br/cobrancas/v2/boletos/00031285579999999998?gw-dev-app-key=139a9a5f64963519731b26966b98b0d7";
        const auth = token.token_type +" " +token.access_token;

        const response = requestEditarBoleto(url, body, auth);

        response.then(res => {
            console.log(res)
            customRecordCnabParcela.save({ ignoreMandatoryFields: true });

            window.location.reload();
    
        }).catch(error => {
            console.log('error Interno', error);
        });

    }




}

const alterarValorBoleto = (idTransaction) => {

    alert("alterarValor");

    const body = payLoad()
    const valorAlteracao = Number(window.prompt("Digite o valor de alteração: "));

    if (!valorAlteracao) {

        alert("Digite um valor");
        editarBoleto(idTransaction);

    } else {

        console.log('Alterdo para R$ ', valorAlteracao, ' -->  id boleto: ', idTransaction  )
        const customRecordCnabParcela = record.load({
            type: cts.CNAB_AUXLIAR_PARCELA.ID,
            id: idTransaction
        });
        customRecordCnabParcela.setValue({fieldId: cts.CNAB_AUXLIAR_PARCELA.VALOR_ATUAL, value: valorAlteracao})

        customRecordCnabParcela.save({ ignoreMandatoryFields: true });

        window.location.reload()

    }

}

const alterarTaxaJurosBoleto = () => {
    alert("alterarTaxa");
}
