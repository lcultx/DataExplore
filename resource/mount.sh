mkdir -p /mnt/sdc && mount -t ext4 /dev/sdc1 /mnt/sdc
mount -bind qzone_logs/ /root/app/DataExplore/resource/qzone_logs
mount --bind ./wanba_logs/ /root/app/DataExplore/resource/wanba_logs
