export interface EntityProjection {

 entityId:string;

 visualObjectId:string;

}


export interface SceneProjector {

 create(
   entityId:string
 ):Promise<EntityProjection>;


 update(
   entityId:string,
   state:unknown
 ):Promise<void>;

}
