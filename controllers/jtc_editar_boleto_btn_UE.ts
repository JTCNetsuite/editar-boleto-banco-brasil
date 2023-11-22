/**
 * @NAPIVersion 2.x
 * @NScriptType UserEventScript
 */

import { EntryPoints } from 'N/types';
import * as msr from '../models/jtc_editar_boleto_MSR';
import * as log from 'N/log';
import * as record from 'N/record'

export const beforeLoad: EntryPoints.UserEvent.beforeLoad = (ctx: EntryPoints.UserEvent.beforeLoadContext) => {
    try {
        

        if (ctx.type ==  ctx.UserEventType.VIEW) {
            log.debug("view", "ok");
            msr.createButton(ctx.form, "editarBoleto("+ctx.newRecord.id+")");

            const nossoNumero = ctx.newRecord.getValue("custrecord_dk_cnab_nosso_numero")
            const link = msr.preencherPdfDoBoleto(nossoNumero)
            log.debug("link", link)

            const rec = record.load({
                id: ctx.newRecord.id,
                type: 'customrecord_dk_cnab_aux_parcela'
            })
            rec.setValue({fieldId: 'custrecord_jtc_pdf_do_boleto', value: `https://7414781.app.netsuite.com${link}`})
            rec.save()

        }

    } catch (e) {
        log.debug('jtc_editar_boleto_btn_UE.beforeLoad', e);        
    }

}