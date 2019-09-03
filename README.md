## What is this ?

This is an external LMS app for easily getting an overview of how cohort engineers are doing in sims in LMS perspective.

## Setting up environment

1. To run the app you will need to install both docker and docker-compose. For mac open [https://docs.docker.com/docker-for-mac/install/]. I comes with both
2. You will need  canvas permissions to view data of your engineers. <br/>Go to canvas, account->settings->New Access Token. <br/> Paste it in the .env for CANVAS_API_KEY

## How to run the app?

In the project directory, you can run:

1. ### `docker-compose build`

[Re]Builds the docker containers. Always use this command if you pulled new changes from the repo<br>

2. ### `docker-compose up -d`

Runs the built containners in a network. always use this if you dont need to rebuild the containers. you can access your site on [localhost](http://localhost) 

Note: you can run both in one go :  docker-compose build && docker-compose up -d

3. ### `docker-compose stop`

Stops the docker network. All of the containers stop.

### How to use The App
Provide the course id in the provided box then click Active Engineers them you can explore the rest. if you are set to view all of the sections in canvas you will need a way round for that as you will see a huge list.

