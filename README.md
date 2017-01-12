#To install project type: npm install

#To start project type: npm start

#To change config open gulpfile.js

#To change npm settings or add some package open package.json


#DOCKER 


#To build docker image:

# user$  docker build --tag="fe-noname/img:v2" .




#To run built docker image:

# user$  docker volume create --name=fe-Noname 
# user$  docker run -p 49160:9000 -d -v fe-Noname:src/ fe-noname/img:v2


#Webserver starts at to http://localhost:49160

