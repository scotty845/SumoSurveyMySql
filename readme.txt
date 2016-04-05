
Sumo Survey
Description

Guest: Take Survey 
1)When a guest visits the app in a browser it  presents a random survey question to the guest. 

2)The app avoids showing a previously answered question to the same guest based on ip adress tracking.

3)The guest then can take the survey question and there answer is recorded into a mysql database

Admin: Make Survey
The app  allows an admin to enter survey questions with multiple choice answers. 
1)The admin can add edit delete question and answers.
2)The admin can view survey results answers and number of votes total and per voted answer


Technologies:
Back End Server
Node.js 
Express
Node mysql, Sequelize, Underscore

Front End Display and Test
Angular
Tested On:
Mozilla Firefox 44.0.2 
Google Chrome	49.0.2623.87 (Official Build) m (32-bit)

Database
mysql

To Utilize:
Set Up mysql databse with tables and data:
Run sumo_survey.sql in DB folder in mysql to create a mysql database sumo_survey database, with four tables
 1)questions  with sample data 
 2)answers with sample data
 3)surveyanswers with sample data
 4)surveyusers with sample data

Has project dependicies in node_modules folder

From shell console change to directory with sumosurveyserver.js

Run node sumosurveyserver to start server 

Browse to localhost:3000 on your web browser
Tested On:
Mozilla Firefox 44.0.2 
Google Chrome	49.0.2623.87 (Official Build) m (32-bit)

To Take Surveys Click On Take Survey
From there guests can take multiple choice survey questions

To Make Surveys Click On Make Survey
Make Survey Requires Admin Login
Can Use Admins in surveyusers table to login
username: hhanzo password:ninja
or
username: mmusashi password:sword

From There Admin Can 
Login
Add Questions
Add Answers
Edit Questions
Edit Answers
Delete Questions
Delete Answers
View Survey Results 
a)Total Number Of Votes By Question
b)Total Number Of Votes Per Answer
Logout