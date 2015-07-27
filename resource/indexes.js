
db.qzone_log_events.ensureIndex({player_action:1,theday_str:1});
db.qzone_log_events.ensureIndex({player_id:1,server_name:1,theday_str:1,player_action:1});
