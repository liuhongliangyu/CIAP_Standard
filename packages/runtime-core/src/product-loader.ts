export interface ProductLoader {

  load(
    productId:string
  ):Promise<void>;

}


export interface RuntimeLifecycle {

  start():Promise<void>;

  pause():Promise<void>;

  stop():Promise<void>;

}
