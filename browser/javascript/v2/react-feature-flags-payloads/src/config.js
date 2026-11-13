const defaults=Object.freeze({reportLimit:2,showComparison:false});
export function configFromVariant(variant){
 if(variant?.value!=='expanded')return {...defaults,source:variant?.value==='control'?'control':'missing_variant'};
 const payload=variant.payload;
 const valid=payload!==null&&typeof payload==='object'&&!Array.isArray(payload)&&Object.keys(payload).length===2&&Object.keys(payload).every(k=>['reportLimit','showComparison'].includes(k))&&Number.isInteger(payload.reportLimit)&&payload.reportLimit>=1&&payload.reportLimit<=10&&typeof payload.showComparison==='boolean';
 return valid?{reportLimit:payload.reportLimit,showComparison:payload.showComparison,source:'remote'}:{...defaults,source:'invalid_payload'};
}
