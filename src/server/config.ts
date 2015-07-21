/// <reference path="../../typings/node/node.d.ts"/>

import path = require('path');

export var port = 8020;



export function getQZoneLatteLogsDir():string{
  return path.join(__dirname,'../../resource/qzone_logs');
}

export function getWanbaSDKLogsDir():string{
  return path.join(__dirname,'../../resource/wanba_logs');
}

export function getEconomyLogsDir():string{
  return path.join(__dirname,'../../resource/economy_logs');
}
