#!/bin/zsh

# set user variables
PATH='/Users/adriengsell/.nvm/v0.10.36/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/opt/local/bin:/opt/X11/bin:/usr/local/git/bin'
SOURCEFOLDER='Sources'
USR='leka.io'
VERSION='prod'
SERVER='leka.cloudapp.net'

# Deploy sources
cd ~/$SOURCEFOLDER/$USR/$USR
grunt $VERSION

# Run the app
APPSCRIPT='cd /home/'$USR-$VERSION'/'$USR'/ ;\
npm install --production ;\
export NODE_ENV='$VERSION' ;\
forever stop app.js ;\
forever start app.js ;\
sudo cp /home/'$USR-$VERSION'/'$USR'/sh/'$VERSION'/nginx.conf /etc/nginx/sites-available/'$USR-$VERSION' ;\
sudo ln -s /etc/nginx/sites-available/'$USR-$VERSION' /etc/nginx/sites-enabled/ ;\
sudo service nginx reload'
ssh -t $USR-$VERSION@$SERVER "$APPSCRIPT"