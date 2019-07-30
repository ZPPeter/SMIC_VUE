FROM hub.c.163.com/library/nginx
MAINTAINER Jounghu <1358199510@qq.com>
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY dist/  /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html
RUN chmod -R a+rx *

