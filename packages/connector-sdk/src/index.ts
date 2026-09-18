export interface Connector {

 id:string;

 connect():Promise<void>;

 disconnect():Promise<void>;

 health():Promise<'UP'|'DOWN'|'DEGRADED'>;

}


export interface CanonicalMessage {

 id:string;

 source:string;

 timestamp:number;

 entityId:string;

 type:string;

 payload:unknown;

}
