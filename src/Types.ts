export interface Datatype {
  res_x: number;
  res_y: number;
  data: number[];
}

export interface CtxDataType{
  x?: number;
  y?: number;
  updateX: (_d?: number) => void;
  updateY: (_d?: number) => void;
}