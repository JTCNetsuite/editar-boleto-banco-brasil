/**
 * @NAPIVersion 2.x
 * @NModuleScope public
 */

import { EntryPoints } from 'N/types';
import { contants as cts } from '../module/jtc_editar_boleto_CTS';
import * as log from "N/log";

export const beforeLoad = (ctx: EntryPoints.UserEvent.beforeLoadContext) => {
    try {
        
    } catch (error) {
        log.error("jtc_editar_boleto_MSR.beforeLoad", error);
    }
}