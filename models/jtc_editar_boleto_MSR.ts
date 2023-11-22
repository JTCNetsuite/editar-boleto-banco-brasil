/**
 * @NAPIVersion 2.x
 * @NModuleScope public
 */

import { contants as cts } from '../module/jtc_editar_boleto_CTS';
import * as log from "N/log";
import { Form } from "N/ui/serverWidget";
import * as record from 'N/record';
import * as https from  'N/https';
import * as search from 'N/search';

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
            "B - Alterar data de vecimento \n" +
            "C - alterar taxa de juros do boleto \n"
        );
        console.log(op);

        switch (op) {
            case "A":
                abatimentoNoValorBoleto(idTransaction);
                break;
            case "B":
                alterarDataDoVencimento(idTransaction);
                break;
            case "C":
                alterarTaxaJurosBoleto(idTransaction);
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
        const url = "https://oauth.bb.com.br/oauth/token";
        // const url = 'https://oauth.hm.bb.com.br/oauth/token';

        const authorization = "Basic ZXlKcFpDSTZJalJtTlRWak56VXRNR015WVMwMFl5SXNJbU52WkdsbmIxQjFZbXhwWTJGa2IzSWlPakFzSW1OdlpHbG5iMU52Wm5SM1lYSmxJam8wTlRJMk1Td2ljMlZ4ZFdWdVkybGhiRWx1YzNSaGJHRmpZVzhpT2pGOTpleUpwWkNJNklqaGhOak13SWl3aVkyOWthV2R2VUhWaWJHbGpZV1J2Y2lJNk1Dd2lZMjlrYVdkdlUyOW1kSGRoY21VaU9qUTFNall4TENKelpYRjFaVzVqYVdGc1NXNXpkR0ZzWVdOaGJ5STZNU3dpYzJWeGRXVnVZMmxoYkVOeVpXUmxibU5wWVd3aU9qRXNJbUZ0WW1sbGJuUmxJam9pY0hKdlpIVmpZVzhpTENKcFlYUWlPakUyT0RNd05USXdNRE00TmpsOQ==";
        // const authorization = "Basic ZXlKcFpDSTZJalZsTWpnMFltUXRNeUlzSW1OdlpHbG5iMUIxWW14cFkyRmtiM0lpT2pBc0ltTnZaR2xuYjFOdlpuUjNZWEpsSWpvMU5qRTRNaXdpYzJWeGRXVnVZMmxoYkVsdWMzUmhiR0ZqWVc4aU9qRjk6ZXlKcFpDSTZJbUV4TnpNMU9EY3RZbVl5TlMwMFlXTWlMQ0pqYjJScFoyOVFkV0pzYVdOaFpHOXlJam93TENKamIyUnBaMjlUYjJaMGQyRnlaU0k2TlRZeE9ESXNJbk5sY1hWbGJtTnBZV3hKYm5OMFlXeGhZMkZ2SWpveExDSnpaWEYxWlc1amFXRnNRM0psWkdWdVkybGhiQ0k2TVN3aVlXMWlhV1Z1ZEdVaU9pSm9iMjF2Ykc5bllXTmhieUlzSW1saGRDSTZNVFkzTnpjMk1UUTFPVE13TVgw";

        
        
    
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


const payLoad = (numConveio) => {
    return {
        "numeroConvenio": numConveio,
        "indicadorNovaDataVencimento": "N",
        "alteracaoData": {
            "novaDataVencimento": ""
        },
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
            // "valorJuros": 0,
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
            body_req: body,
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

const urlEdit = (numConveio, nossoNumero) => `https://api.bb.com.br/cobrancas/v2/boletos/${nossoNumero}?gw-dev-app-key=4a5e515a85aa0cb8a74b71646d5ec025&numeroConvenio=${numConveio}`
// const urlEdit = (numConveio, nossoNumero) => `https://api.hm.bb.com.br/cobrancas/v2/boletos/${nossoNumero}?gw-dev-app-key=139a9a5f64963519731b26966b98b0d7&numeroConvenio=${numConveio}`


const abatimentoNoValorBoleto = (idTransaction) => {
    
    
    const customRecordCnabParcela = record.load({
        type: cts.CNAB_AUXLIAR_PARCELA.ID,
        id: idTransaction
    })
    const nossoNumero = customRecordCnabParcela.getText(cts.CNAB_AUXLIAR_PARCELA.NOSSO_NUMERO);
    const numConveio = customRecordCnabParcela.getText(cts.CNAB_AUXLIAR_PARCELA.NUM_CONVENIO);
    const body = payLoad(numConveio);
    
    const valor_do_abatimento = Number(window.prompt("Digite o valor do abatimento: "));
    
    const valor_abatimento_field = Number(customRecordCnabParcela.getValue(cts.CNAB_AUXLIAR_PARCELA.VALOR_ABATIMENTO));




    if (!valor_do_abatimento) {
        alert("Digite um valor");
        editarBoleto(idTransaction);
    } else {
        console.log(valor_do_abatimento);
        const token = JSON.parse(getAccessToken());
        console.log(token);

        // TODO SE PEDIREM PARA ALTERAR O VALOR DO ABATIMENTO ---

        // if (!!valor_abatimento_field) {
        //     console.log("alterar o valor do abatimento!");
        //     body.indicadorAlterarAbatimento = "S";
        //     body.alteracaoAbatimento.novoValorAbatimento = valor_do_abatimento;
            
        //     const novoValotBatatimento = valor_abatimento_field - valor_do_abatimento;

        //     const valorOrginal = Number(customRecordCnabParcela.getValue(cts.CNAB_AUXLIAR_PARCELA.VALOR_ORGINAL));

        //     customRecordCnabParcela.setValue({fieldId: cts.CNAB_AUXLIAR_PARCELA.VALOR_ABATIMENTO, value:  novoValotBatatimento});
            
        //     customRecordCnabParcela.setValue({fieldId: cts.CNAB_AUXLIAR_PARCELA.VALOR_ATUAL, value: valorOrginal - novoValotBatatimento});
            


        // } else {
        console.log("Incluir o valor do abatimento!");
        body.indicadorIncluirAbatimento = "S";
        body.abatimento.valorAbatimento = valor_do_abatimento;

        const novoValotBatatimento = valor_abatimento_field + valor_do_abatimento;
        console.log(novoValotBatatimento);
        const valorOriginal = Number(customRecordCnabParcela.getValue(cts.CNAB_AUXLIAR_PARCELA.VALOR_ORGINAL));

        const valor_atual = valorOriginal - novoValotBatatimento;

        customRecordCnabParcela.setValue({fieldId: cts.CNAB_AUXLIAR_PARCELA.VALOR_ABATIMENTO, value:  novoValotBatatimento});
        customRecordCnabParcela.setValue({ fieldId: cts.CNAB_AUXLIAR_PARCELA.VALOR_ATUAL, value: valor_atual });

        // }
        
        const url = urlEdit(numConveio, nossoNumero);
        
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


const alterarDataDoVencimento = (idTransaction) => {
    
    const dtVencimento = window.prompt("Digite a data: DD/MM/YYYY");
    
    const customRecordCnabParcela = record.load({
        type: cts.CNAB_AUXLIAR_PARCELA.ID,
        id: idTransaction
    });
    
    const nossoNumero = String(customRecordCnabParcela.getText(cts.CNAB_AUXLIAR_PARCELA.NOSSO_NUMERO));
    const numConveio = customRecordCnabParcela.getText(cts.CNAB_AUXLIAR_PARCELA.NUM_CONVENIO);
    const body = payLoad(numConveio);
    
    if (!!dtVencimento) {
        if (verificaoData(dtVencimento)) {
            const dataFormat = dtVencimento.split('/').join('.');
            const token = JSON.parse(getAccessToken());

            const url = urlEdit(numConveio, nossoNumero);
            
            body.indicadorNovaDataVencimento = "S";
            body.alteracaoData.novaDataVencimento = dataFormat;

            const auth = token.token_type +" " +token.access_token;

            const response = requestEditarBoleto(url, body, auth);

            response.then(res => {
                console.log(res);
                customRecordCnabParcela.setValue({fieldId: cts.CNAB_AUXLIAR_PARCELA.DATA_VENCIMENTO, value: dataFormat});

                customRecordCnabParcela.save({ignoreMandatoryFields: true});

                window.location.reload();
            }).catch(error => {
                console.log('error', error);
            });
        } else {
            alert("Formatção da data inválida!");
            editarBoleto(idTransaction);
        }
    } else {
        alert('Data inválida!');
        editarBoleto(idTransaction);
    }
    


}

const verificaoData = (data: string) => {
    const x = data.split("/");
    if (x.length != 3) {
        return false;
    } 

    if (x[0].length != 2 || x[1].length != 2) {
        return false;
    }

    if (x[2].length != 4) {
        return false;
    }

    return true;

}


const alterarTaxaJurosBoleto = (idTransaction) => {
    
    const valor_juros = parseFloat(window.prompt("Digite um valor para o juros (%): "));
    const customRecordCnabParcela = record.load({
        type: cts.CNAB_AUXLIAR_PARCELA.ID,
        id: idTransaction
    });
    
    const nossoNumero = String(customRecordCnabParcela.getText(cts.CNAB_AUXLIAR_PARCELA.NOSSO_NUMERO));
    const numConveio = customRecordCnabParcela.getText(cts.CNAB_AUXLIAR_PARCELA.NUM_CONVENIO);
    
    const body = payLoad(numConveio);


    if (!valor_juros) {
        alert("Digite um valor!");
        editarBoleto(idTransaction);
    } else {
        console.log("valor do juros: ", valor_juros);
        const token = JSON.parse(getAccessToken());
        const url = urlEdit(numConveio, nossoNumero);

        const tipo_juros = Number(customRecordCnabParcela.getValue(cts.CNAB_AUXLIAR_PARCELA.JUROS_TIPO));

        body.indicadorCobrarJuros = "S";
        body.juros.tipoJuros = tipo_juros;
        body.juros.taxaJuros = valor_juros;

        

        const auth = token.token_type +" " +token.access_token;
        
    
        const response = requestEditarBoleto(url, body, auth);

        response.then(res => {
            console.log(res);

            customRecordCnabParcela.setValue({fieldId: cts.CNAB_AUXLIAR_PARCELA.JUROS_PORCENTAGEM, value: valor_juros});

            customRecordCnabParcela.save({ignoreMandatoryFields: true});

            window.location.reload();

        }).catch(error => {
            console.log('jtc_editar_boleto_MSR.alterarTaxaJurosBoleto', error);

        })

    }

}


export const preencherPdfDoBoleto = (nossoNumero) => {
    try {
        var folderSearchObj = search.create({
            type: "folder",
            filters:
            [
               ["file.name","haskeywords",nossoNumero]
            ],
            columns:
            [
               search.createColumn({
                  name: "name",
                  join: "file",
                  label: "Nome"
               }),
               search.createColumn({
                  name: "url",
                  join: "file",
                  label: "URL"
               }),
               search.createColumn({
                  name: "internalid",
                  join: "file",
                  label: "ID interno"
               })
            ]
         }).run().getRange({start: 0, end: 1})
        //  log.debug("folder", folderSearchObj)
        //  if (folderSearchObj.length >  1){
        log.debug("foler", folderSearchObj[0].getValue({name: 'url', join: 'file'}))
        return folderSearchObj[0].getValue({name: 'url', join: 'file'})
        //  }

    } catch (error) {
        log.error("jtc_editar_Boleto_MSR.preencherPdfDoBoleto", error)
    }
}