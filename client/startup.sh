#!/bin/sh

# putting this envsubst invocation in a startup script allows for
# a much cleaner startup command in the service's Dockerfile

envsubst '\$PORT' \
< /etc/nginx/conf.d/configfile.template \
> /etc/nginx/conf.d/default.conf

nginx -g 'daemon off;'
