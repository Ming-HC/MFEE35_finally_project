create database if not exists member
character set utf8mb4;
CREATE TABLE member.info (
  `id` int not null AUTO_INCREMENT,
  `UserName` varchar(20) NOT NULL,
  `Password` varchar(20) NOT null,
  `headshot` varchar(20) default null,
  `register_time` timestamp default now(),
  primary key (`id`)
);
select * from member.info;
INSERT INTO member.info (UserName, Password, headshot) VALUES ('test', 'test', 'headshot_5.png');
-- drop table member.info;
delete from member.info where id = 7;