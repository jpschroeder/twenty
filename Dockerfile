FROM node:6.5.0
MAINTAINER John Schroeder "john@schroederspace.com"
#RUN apt-get update -y
COPY ./ /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm"]
CMD ["start"]

