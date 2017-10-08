# Mission Statement
By providing real-time data, we help reading teachers give each student the attention he/she deserves.

# User Stories

## BEFORE LESSON
- teacher can sign up, create a class, enter students
- teacher can login and logout
- students can login
- teacher can create a lesson: select a text, class, grade and standard
- teacher can create a question
- teacher can create an answer by highlighting the text

## DURING LESSON
- students can login and upon login, view the complete text
- teacher can activate a question to start the lesson
- STUDENT REALTIME
  - highlight one selection in the text
  - student can clear answer
  - student can finalize answer (disables student screens)
- TEACHER REALTIME
  - teacher can view student screens while in progress
      - 4-across a page
      - scrollable up and down
      - see each screen in minature
      - box highlights green, blue and red
  - teacher can select a student screen to view enlarged (individual)
  - teacher can stop the lesson (finalizes answers)

## AFTER LESSON
- ### STUDENT VIEW
  - Student can view his/her answer + teacher answer
- ### TEACHER VIEW
  - teacher can see student grouping into green, blue and red categories
  - teacher can start a new lesson
  - teacher logs out and all students are also logged out



# Technology
- Database: MongoDB with Mongoose
- Framework: Express/Webpack on Node
- Front-End: React, HTML5, CSS, Bootstrap and SASS
- Other: _Underscore.js, jQuery, socket.io

# Contributing
This is an open-source project that has the potential to be a game-changer
in classrooms across the country. It does, however, have some steps before
it is classroom ready. Specifically, the sockets need to be made ready
for individual classrooms, authentication needs to be increase for privacy
of student data, and the data that is collected over time needs to be
made available and accesible to teachers.

## Some guidelines for Contributing
This project needs to increase it's reliablity, and so all pull requests
needs to include an acceptable amount of testing. Please use standard
javascript/jsx and not es6 syntax for the time being, and please
explain as much as possible the pull-requests impact on the project.

