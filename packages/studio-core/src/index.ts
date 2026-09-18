export type DesignerType =
  | 'WORLD'
  | 'ENTITY'
  | 'PROCESS'
  | 'POLICY'
  | 'SCENARIO';


export interface DesignerDocument {

  id:string;

  type:DesignerType;

  version:string;

  content:unknown;

}


export interface StudioProject {

  id:string;

  documents:DesignerDocument[];

}
