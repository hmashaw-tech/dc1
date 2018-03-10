#!/bin/bash

# Set DEMO_SERVER via ENV

clear

printf  'Running InSpec on %s ... \n\n' $DEMO_SERVER

# inspec supermarket exec -i ~/.ssh/geomar-demo.key -t ssh://ubuntu@$DEMO_SERVER dev-sec/linux-baseline

# inspec supermarket exec -i ~/.ssh/geomar-demo.key -t ssh://ubuntu@$DEMO_SERVER dev-sec/linux-patch-baseline

inspec supermarket exec -i ~/.ssh/geomar-demo.key -t ssh://ubuntu@$DEMO_SERVER dev-sec/nginx-baseline
