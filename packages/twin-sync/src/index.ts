export interface TwinSync {


applyLiveMessage(

 message:unknown

):Promise<void>;


publishTwinState(

 entityId:string

):Promise<void>;


}


export type TwinMode =

 | 'SIMULATION'
 | 'LIVE'
 | 'HYBRID'
 | 'REPLAY';
