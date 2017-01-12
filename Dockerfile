FROM ubuntu:16.04


WORKDIR /src


RUN apt-get update 
RUN apt-get install -y curl 

RUN curl --silent --location https://deb.nodesource.com/setup_0.10 | bash -

RUN apt-get install -y nodejs	
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y build-essential
RUN apt-get install -y npm

RUN ls -la
COPY ./ /src/

RUN cd /src && npm install && ls -la


EXPOSE 9000
CMD ["npm", "start"]
