/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface $ {
  tooltip(options?: any): any;
}
