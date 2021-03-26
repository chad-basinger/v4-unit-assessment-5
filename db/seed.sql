create table helo_users (
id serial primary key,
username varchar(255) not null,
password varchar(255) not null,
profile_pic text

)

create table helo_posts (
id serial primary key,
title varchar(45) not null,
content text,
img text,
author_id integer references helo_users(id),
date_created timestamp
)

insert into helo_users (username, password)
VALUES ('chad', 'chad1'),
('jake', 'jake1')

insert into helo_posts (title, content, img, author_id, date_created)
VALUES 
('first post', 'this is so fun', 'http: img', 2, '2019-06-22 19:10:25-07')