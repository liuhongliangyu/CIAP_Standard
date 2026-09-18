export interface MobileAgent {
  id:string;
  type:string;
  position:[number,number,number];
  capacity?:number;
}

export interface AGVAgent extends MobileAgent {
  type:'agv';
  battery:number;
  status:string;
}

export interface ForkliftAgent extends MobileAgent {
  type:'forklift';
}

export interface HumanAgent extends MobileAgent {
  type:'human';
  skill:string[];
}
