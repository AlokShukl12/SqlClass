create table user(
id varchar(40) primary key,
username varchar(20) unique,
email varchar(60) unique not null,
password varchar(40) not null

);