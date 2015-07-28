import moment = require('moment');
export function getYesterdayStr():string{
  return getThedayStrOfTheday(moment().subtract(1,'d'));
}

export function getThedayStrOfTheday(theday):string{
  return theday.format('YYYY/MM/DD');
}
