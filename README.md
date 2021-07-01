# Setup Instructions


1 => Download and install Node.js from Download | Node.jshttps://nodejs.org › download

2 => Download and install Mongodb from (Note: when prompted to install mongodb compass, click yes)

3 => If you do not have any IDE installed, download and install vscode or any IDE of your choice MongoDB Community Download | MongoDBhttps://www.mongodb.com › try › download › community

4 => From the path where mongodb was installed, locate the mongod file and run it

5 => Open the project folder using vscode or your IDE of choice

6 => Open a new terminal in VsCode by going to terminal > new. to create a new terminal

7 => With the terminal, navigate to the api using 'cd api' then enter

=> Create a folder (in the desktop preferably) for where you would store your images i.e. This will be your image database

=> Take a picture of your self and save it as '16_ENG04_001.jpg' (This is an initial seed user that will be created in the mongodb database)

=> Open the apii.py file from the file explorer at the left pane in vscode 

=> scroll down to line 82 and update the path to the database folder you created


8 => Type 'pip install flask deepface' to install the required packages needed by the face recognition API

9 => Type 'python apii.py' to run the python api (Note: if you get an error saying {package name} is missing, run 'pip install {package name}' to install the missing package)

10 => Open a new terminal and navigate to the web app using 'cd web-app'

11 => Type 'npm install' to install the required packages for the web app

12 => Type 'node app.js' to start the web app

Open up your browser and go to the URL below

http://localhost:3000

Attachments area
