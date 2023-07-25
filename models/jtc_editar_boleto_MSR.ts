/**
 * @NAPIVersion 2.x
 * @NModuleScope public
 */

import { contants as cts } from '../module/jtc_editar_boleto_CTS';
import * as log from "N/log";
import { Form } from "N/ui/serverWidget";
import * as record from 'N/record';
import * as runtime from  'N/runtime';
import * as https from  'N/https';



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
        const authorization = "Basic ZXlKcFpDSTZJalJtTlRWak56VXRNR015WVMwMFl5SXNJbU52WkdsbmIxQjFZbXhwWTJGa2IzSWlPakFzSW1OdlpHbG5iMU52Wm5SM1lYSmxJam8wTlRJMk1Td2ljMlZ4ZFdWdVkybGhiRWx1YzNSaGJHRmpZVzhpT2pGOTpleUpwWkNJNklqaGhOak13SWl3aVkyOWthV2R2VUhWaWJHbGpZV1J2Y2lJNk1Dd2lZMjlrYVdkdlUyOW1kSGRoY21VaU9qUTFNall4TENKelpYRjFaVzVqYVdGc1NXNXpkR0ZzWVdOaGJ5STZNU3dpYzJWeGRXVnVZMmxoYkVOeVpXUmxibU5wWVd3aU9qRXNJbUZ0WW1sbGJuUmxJam9pY0hKdlpIVmpZVzhpTENKcFlYUWlPakUyT0RNd05USXdNRE00TmpsOQ==";
        
        
    
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
            body: ""
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
        "indicadorNovaDataVencimento": "n",

        "indicadorAtribuirDesconto": "N",
        "indicadorAlterarDesconto": "N",
        "indicadorAlterarDataDesconto": "N",
        "indicadorProtestar": "N",
        "indicadorSustacaoProtesto": "N",
        "indicadorCancelarProtesto": "N",
        "indicadorIncluirAbatimento": "S",
        "abatimento": {
            "valorAbatimento": 111.99
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


const abatimentoNoValorBoleto = (idTransaction) => {
    const body = payLoad();



    const valor_do_abatimento = Number(window.prompt("Digite o valor do abatimento: "));


    if (!valor_do_abatimento) {
        alert("Digite um valor");
        editarBoleto(idTransaction);
    } else {
        console.log(valor_do_abatimento);
        const token = getAccessToken();
        console.log(token);

        const customRecordCnabParcela = record.load({
            type: cts.CNAB_AUXLIAR_PARCELA.ID,
            id: idTransaction
        });


        customRecordCnabParcela.setValue({ fieldId: cts.CNAB_AUXLIAR_PARCELA.VALOR_ABATIMENTO, value: valor_do_abatimento });

        const valorOriginal = Number(customRecordCnabParcela.getValue(cts.CNAB_AUXLIAR_PARCELA.VALOR_ORGINAL));


        const valor_atual = valorOriginal - valor_do_abatimento;

        customRecordCnabParcela.setValue({ fieldId: cts.CNAB_AUXLIAR_PARCELA.VALOR_ATUAL, value: valor_atual });

        // customRecordCnabParcela.save({ ignoreMandatoryFields: true });

        // window.location.reload()

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
