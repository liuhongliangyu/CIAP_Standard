export interface AssetReference {
  id:string;
  format:'gltf'|'cad'|'other';
  uri:string;
}

export interface AssetLoader {
  load(
    asset:AssetReference
  ):Promise<unknown>;
}
