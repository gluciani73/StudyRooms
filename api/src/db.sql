-- sudo -u postgres psql
create database "StudyRooms";
create user study_user with encrypted password '1234Study';
grant all privileges on database "StudyRooms" to study_user;
