/**
 * @NAPIVersion 2.x
 * @NModuleScope public
 */

import { contants as cts } from '../module/jtc_editar_boleto_CTS';
import * as log from "N/log";
import { Form } from "N/ui/serverWidget";


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
                "B - alterar valor do boleto \n"+
                "C - alterar taxa de juros do boleto \n"
            );
            console.log(op);    

            switch (op) {
                case "A":
                    batimentoNoValorBoleto();
                    break;
                case "B":
                    alterarValorBoleto();
                    break;
                case "C":
                    alterarTaxaJurosBoleto();
                    break
                default:
                    alert("Valor inválido, tente novamente!");
            }


    } catch (error) {
        log.error("jtc_editar_boleto_MSR.editarBoleto", error);
    }
}



const batimentoNoValorBoleto = () => {
    alert("batimento");
}

const alterarValorBoleto = () => {
    alert("alterarValor");
}

const alterarTaxaJurosBoleto = () => {
    alert("alterarTaxa");
}
