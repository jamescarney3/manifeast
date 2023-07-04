#!/usr/bin/env bash

# Create the Rails production DB on first run;
# nothing will happen on subsequent runs
bundle exec rails db:create

# Make sure we are using the most up to date
# database schema
bundle exec rails db:migrate
