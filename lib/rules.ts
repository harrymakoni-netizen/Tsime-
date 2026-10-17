export type Status = 'working'|'low_flow'|'not_working'|'source_dry';
export type StatusEvent = { at: string; status: Status };
export const faultNames: Record<number,string> = {1:'Water is flowing',2:'No water',3:'Weak or slow water',4:'Leaking pipe, tap or tank',5:'Solar panels damaged or missing',6:'Hand pump broken',7:'Water quality concern'};
export function parseSms(body:string, latestPoint?:number):{point:number;code:number}|null {
 const clean=body.trim().toUpperCase().replace(/^TS[\s-]*/, '').replace(/\s+/g,' ');
 const match=clean.match(/^(\d{1,5})[\s,;:]+([1-7])$/);
 if(match)return {point:Number(match[1]),code:Number(match[2])};
 if(/^[1-7]$/.test(clean)&&latestPoint)return {point:latestPoint,code:Number(clean)};
 return null;
}
export function uptime(events:StatusEvent[],from:Date,to:Date){
 const start=from.getTime(),end=to.getTime(); if(end<=start)throw new Error('Invalid reporting period');
 const sorted=[...events].filter(e=>Date.parse(e.at)<end).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
 const boundaries=[start,end,...sorted.map(e=>Date.parse(e.at)),...sorted.map(e=>Date.parse(e.at)+14*86400000)].filter(t=>t>=start&&t<=end).sort((a,b)=>a-b);
 let dry=0,down=0;
 for(let i=0;i<boundaries.length-1;i++){const a=boundaries[i],b=boundaries[i+1];const e=sorted.filter(e=>Date.parse(e.at)<=a).at(-1);if(!e||a-Date.parse(e.at)>=14*86400000)down+=b-a;else if(e.status==='source_dry')dry+=b-a;else if(e.status==='not_working')down+=b-a;}
 const eligible=end-start-dry;return {ratio:eligible?Math.max(0,(eligible-down)/eligible):null,dryHours:dry/3600000,downHours:down/3600000};
}
export function paymentCents(ratio:number|null,fee:number){if(!Number.isInteger(fee)||fee<0)throw new Error('Fee must be non-negative integer cents');if(ratio===null||ratio<.5)return 0;if(ratio>=.9)return fee;return Math.floor((fee*ratio/.9)+1e-9)}
export function revenueShare(sales:number,inputs:number,split=[50,25,25]){if(![sales,inputs,...split].every(Number.isInteger)||sales<0||inputs<0||split.some(v=>v<0)||split.reduce((a,b)=>a+b,0)!==100||split.length!==3)throw new Error('Invalid money or split');const net=Math.max(0,sales-inputs);const youth=Math.floor(net*split[0]/100),maintenance=Math.floor(net*split[1]/100);return {net,youth,maintenance,village:net-youth-maintenance,loss:Math.max(0,inputs-sales)}}
export function balanced(entries:{account:string;cents:number}[]){return entries.length>1&&entries.every(e=>Number.isInteger(e.cents))&&entries.reduce((s,e)=>s+e.cents,0)===0}
export function distanceMetres(a:{lat:number;lng:number},b:{lat:number;lng:number}){const rad=Math.PI/180,dlat=(b.lat-a.lat)*rad,dlng=(b.lng-a.lng)*rad;const h=Math.sin(dlat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dlng/2)**2;return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h))}
export async function codeHash(code:string,salt:string){const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${salt}:${code}`));return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('')}
export function dueDate(triage:'A'|'B'|'C',at:string){return new Date(Date.parse(at)+({A:48,B:168,C:24}[triage])*3600000).toISOString()}
export const money=(cents:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100);
