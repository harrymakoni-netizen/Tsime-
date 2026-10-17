import { openDB } from 'idb';
import type { State } from './data';
const db=()=>openDB('tsime-pilot',1,{upgrade(db){db.createObjectStore('workspace')}});
export async function loadState():Promise<State|undefined>{return (await db()).get('workspace','state')}
export async function saveState(state:State){await (await db()).put('workspace',state,'state')}
