FROM node:7.8.0-alpine
MAINTAINER Tauren Kristich tauren.kristich@gmail.com
EXPOSE 1337
ARG NPM_TOKEN
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
RUN npm install
RUN rm -f .npmrc
# Performance tuning
RUN echo "net.core.somaxconn = 3072" >> /etc/sysctl.conf && \
    echo "net.ipv4.tcp_max_syn_backlog = 4096" >> /etc/sysctl.conf && \
    echo "net.ipv4.conf.default.rp_filter = 0" >> /etc/sysctl.conf && \
    echo "net.ipv4.tcp_keepalive_time = 120" >> /etc/sysctl.conf && \
    echo "fs.file-max = 2097152" >> /etc/sysctl.conf
ENTRYPOINT ["node", "index"]