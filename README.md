# Media Server
This repository is for a video media server written in `node js`. It can stream video files from a folder on the hosting machine. It also contains a `React js` UI to display the videos. The UI also searchs for video information from the internet to display to the user.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See the deployment section for notes on how to deploy the project on a live system.

## Prerequisites
Before you get started, you'll need to having the following installed:
* Node, minimum version 8
* NPM

## Installing
### Backend Server
To get a version of the software up and running for development and testing purposes do the following:

Clone the repo (you can use the following console command).

`git clone https://github.com/sgreaves1/RaspberryPiMediaServer.git`

Once installed navigate to the `RaspberryPiMediaServer` folder and do an npm install.

```npm install```

Next start the backend server with node.

```node myapi.js```

Navigate to `localhost:3020` to ensure the server is running.

### Frontend Website
Once you have started the backend server you can run the UI by the following steps:

Ensure the backend is running.

Navigate to the `RaspberryPiMediaServer` folder in a new console window.

Run the frontend with npm command.

`npm start`

Navigate to `localhost:3000` to ensure the front end is running.

## How To See Videos

In order to see videos being displayed in the UI or being returned from the backend API

Create a new folder called `videos` in the `RaspberryPiMediaServer` folder.

Move all video files into this folder.

In order to see video information of films and tv episodes please name the videos by the IMDB film ID usually beginning with `tt`

For example:

If i have the film `CaptainAmerica.mp4` It should be named `tt1843866.mp4`

You can easily find the Id by navigating to the Imdb films webpage. The Id is in the URL

`https://www.imdb.com/title/tt1843866/`

## API Endpoints
#### Backend Server
* `localhost:3020/` - Displays a welcome message.
* `localhost:3020/videos` - Returns 200 with an array of files in the videos folder.
* `localhost:3020/{videoFileName}` - Streams the given video file.

## Running The Tests

## Deployment

## Contributing

## Contact Details

## FAQs

## Change Log