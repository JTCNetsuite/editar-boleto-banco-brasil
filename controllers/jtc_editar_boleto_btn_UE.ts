/**
 * @NAPIVersion 2.x
 * @NScriptType UserEventScript
 */

import { EntryPoints } from 'N/types';
import * as msr from '../models/jtc_editar_boleto_MSR';
import * as log from 'N/log';

export const beforeLoad: EntryPoints.UserEvent.beforeLoad = (ctx: EntryPoints.UserEvent.beforeLoadContext) => {
    try {
        if (ctx.type ==  ctx.UserEventType.VIEW) {
            log.debug("view", "ok");
            msr.createButton(ctx.form, "editarBoleto("+ctx.newRecord.id+")");
        }

    } catch (e) {
        log.debug('jtc_editar_boleto_btn_UE.beforeLoad', e);        
    }

}