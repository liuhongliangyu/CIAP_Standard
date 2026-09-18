export interface LiveStateProvider {


read(

 entityId:string

):Promise<unknown>;


subscribe(

 entityId:string,

 callback:(state:unknown)=>void

):()=>void;


}
