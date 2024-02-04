#!/bin/bash

sudo apt-get update && sudo apt-get upgrade -y

# Dependencies
sudo apt-get install -y \
   git autoconf automake libtool make libreadline-dev texinfo \
   pkg-config libpam0g-dev libjson-c-dev bison flex python3-pytest \
   libc-ares-dev python3-dev libsystemd-dev python-ipaddress python3-sphinx \
   install-info build-essential libsystemd-dev libsnmp-dev perl libcap-dev \
   libpcre3-dev libelf-dev libpcre2-dev cmake 

# Libyang
cd /tmp
git clone https://github.com/CESNET/libyang.git
cd libyang
git checkout v2.1.128
mkdir build; cd build
cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr \
      -DCMAKE_BUILD_TYPE:String="Release" ..
make
sudo make install

# Protobuf
sudo apt-get install -y protobuf-c-compiler libprotobuf-c-dev

# ZeroMQ
sudo apt-get install -y libzmq5 libzmq3-dev

#RTRlib
sudo apt-get install libssh-dev -y

cd /tmp
git clone https://github.com/rtrlib/rtrlib/ 
cd rtrlib
mkdir build; cd build 
cmake -D CMAKE_BUILD_TYPE=Release ..
make
sudo make install
sudo ldconfig

# FRRouting
sudo groupadd -r -g 92 frr
sudo groupadd -r -g 85 frrvty
sudo adduser --system --ingroup frr --home /var/run/frr/ \
   --gecos "FRR suite" --shell /sbin/nologin frr
sudo usermod -a -G frrvty frr

cd /tmp
git clone https://github.com/frrouting/frr.git frr
cd frr
./bootstrap.sh
./configure \
    --prefix=/usr \
    --includedir=\${prefix}/include \
    --enable-exampledir=\${prefix}/share/doc/frr/examples \
    --bindir=\${prefix}/bin \
    --sbindir=\${prefix}/lib/frr \
    --libdir=\${prefix}/lib/frr \
    --libexecdir=\${prefix}/lib/frr \
    --localstatedir=/var/run/frr \
    --sysconfdir=/etc/frr \
    --with-moduledir=\${prefix}/lib/frr/modules \
    --with-libyang-pluginsdir=\${prefix}/lib/frr/libyang_plugins \
    --enable-configfile-mask=0640 \
    --enable-logfile-mask=0640 \
    --enable-snmp=agentx \
    --enable-multipath=64 \
    --enable-user=frr \
    --enable-group=frr \
    --enable-vty-group=frrvty \
    --enable-systemd=yes \
    --enable-rpki=yes \
    --with-pkg-git-version \
    --with-pkg-extra-version=-chriselsen
make
sudo make install

sudo install -m 775 -o frr -g frr -d /var/log/frr
sudo install -m 775 -o frr -g frrvty -d /etc/frr
sudo install -m 640 -o frr -g frrvty tools/etc/frr/vtysh.conf /etc/frr/vtysh.conf
sudo install -m 640 -o frr -g frr tools/etc/frr/frr.conf /etc/frr/frr.conf
sudo install -m 640 -o frr -g frr tools/etc/frr/daemons.conf /etc/frr/daemons.conf
sudo install -m 640 -o frr -g frr tools/etc/frr/daemons /etc/frr/daemons

sudo install -m 644 tools/frr.service /etc/systemd/system/frr.service
sudo systemctl enable frr

# Sysctl
sudo sed -i "/net.ipv4.ip_forward=1/ cnet.ipv4.ip_forward=1" /etc/sysctl.conf
sudo sed -i "/net.ipv6.conf.all.forwarding=1/ cnet.ipv6.conf.all.forwarding=1" /etc/sysctl.conf

# Enable BGP
sudo sed -i "/bgpd=no/ cbgpd=yes" /etc/frr/daemons
sudo sed -i "/bgpd_options=\"   -A 127.0.0.1\"/ cbgpd_options=\"   -A 127.0.0.1 -M rpki\"" /etc/frr/daemons

# Allow FRR to write PID files
sudo chmod 740 /var/run/frr

# Start FRR
sudo systemctl start frr
