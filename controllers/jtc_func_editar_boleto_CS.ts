/**
 * @NAPIVersion 2.x
 * @NScriptType ClientScript
 */

import * as msr from '../models/jtc_editar_boleto_MSR';
import * as log from 'N/log';
import { EntryPoints } from 'N/types';


export const editarBoleto = (idTransaction) => {
    try {
        msr.editarBoleto(idTransaction);
        
    } catch (error) {
        log.error("jtc_func_editar_boleto_CS.editarBoleto", error);
    }
}


export const pageInit: EntryPoints.Client.pageInit = (ctx: EntryPoints.Client.pageInitContext) => {
    
}