interface IModel{
  getJSONValue();
}


interface IEventLogModel extends IModel{
  toLogString():string;
  parseLogLine(line:string);
}
