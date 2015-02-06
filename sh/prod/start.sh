#!/bin/bash

# set user variables
USR='leka.io'
VERSION='prod'
ROOT='ladislas'
SERVER='leka.cloudapp.net'

# Create User
USRSCRIPT='sudo useradd '$USR-$VERSION'; \
sudo passwd '$USR-$VERSION' \
sudo mkdir /home/'$USR-$VERSION'; \
sudo adduser '$USR-$VERSION' sudo; \
cd /home/'$USR-$VERSION'/; \
sudo chown -Rv '$USR-$VERSION' /home/'$USR-$VERSION'/; \
sudo mkdir /home/'$USR-$VERSION'/'$USR'; \
sudo chown -Rv '$USR-$VERSION' /home/'$USR-$VERSION/$USR'/'
#ssh -t $ROOT@$SERVER "$USRSCRIPT"

# Sign the server
pbcopy < ~/.ssh/id_rsa.pub
SIGNSCRIPT='mkdir /home/'$USR'-'$VERSION'/.ssh ;\
vi /home/'$USR'-'$VERSION'/.ssh/authorized_keys'
ssh -t $USR-$VERSION@$SERVER "$SIGNSCRIPT"