
interface ITask{
  run();
}

interface IDailyLogs2Local extends ITask{
  download(theday:moment.Moment);
  exist(theday:moment.Moment);
  getLogsDir(theday:moment.Moment);
}

interface ILocalLogsImport extends ITask{
  run(callback?:Function);
  getServerName(file);
  getReadFilesQueue():any;
  getThedayStr(file):string;
  logfile2db(file,server_name,callback);
  dailyLogfiles2db(theday,callback);
  getCollection();
}

declare module IDailyLogs2Local {
  export function getInstance();
}
