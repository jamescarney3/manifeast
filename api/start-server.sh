#!/usr/bin/env bash

# Do some protective cleanup
> log/production.log
rm -f tmp/pids/server.pid

bundle exec rails server -b 0.0.0.0
