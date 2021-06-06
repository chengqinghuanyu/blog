#!/bin/sh
cd /Volumes/ypx/web/nodejs/blog1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log