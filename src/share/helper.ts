import moment = require('moment');
export function getYesterdayStr():string{
  return getThedayStrOfTheday(moment().subtract(1,'d'));
}

export function getThedayStrOfTheday(theday):string{
  return theday.format('YYYY/MM/DD');
}

export function getClassName(_class):string{
  var funcNameRegex = /function (.{1,})\(/;
  var results = (funcNameRegex).exec(_class.toString());
  return (results && results.length > 1) ? results[1] : "";
}
