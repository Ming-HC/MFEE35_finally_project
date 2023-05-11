create database if not exists member
character set utf8mb4;
CREATE TABLE member.info (
  `member_id` int not null AUTO_INCREMENT,
  `username` char(30) NOT NULL,
  `password` char(20) default null,
  `nickname` varchar(20) default NULL,
  `headshot` varchar(100) default null,
  `email` varchar(30) default NULL,
  `submitfrom` char(10) default 'local',
  `thirdtoken` char(100) DEFAULT NULL,
  `register_time` timestamp default now(),
  primary key (`member_id`)
);
drop table member.info;
select * from member.info;
select * from member.info where binary username = 'beeeee';

create database if not exists forum
character set utf8mb4;
create table forum.class (
`class_id` int not null AUTO_INCREMENT,
`class_name_eng` varchar(20) not null,
`class_name` varchar(20) not null,
`create_class_time` timestamp default now(),
primary key (`class_id`),
unique(`class_name`)
);
create table forum.postlist (
`post_id` int not null AUTO_INCREMENT,
`class_name` varchar(20) not null,
`likes` int(10) default 0,
`title` varchar(40) not null,
`imageurl` varchar(50) default null,
`content` varchar(120) not null,
`user` varchar(20) not null,
`reply` int(10) default 0,
`views` int(10) default 0,
`post_time` timestamp default now(), -- 發文時間
`latestReply_user` varchar(20) default (`user`),
`latestReply_time` timestamp default now(),
`post_exists` int default 1,
primary key (`post_id`),
foreign key (class_name) references class(class_name)
);
create table forum.post_4 (
    reply_floor int not null AUTO_INCREMENT,
    class_name varchar(20) default null,
    title varchar(40) default null,
    user varchar(20) not null,
    -- headshot varchar(20) default null, -- 最好去查會員headshot
    imageurl varchar(50) default null,
    content varchar(1000) not null,
    likes int(10) default 0,
    post_time timestamp default now(), -- 發文時間
    floor_exists default 1,
    primary key (reply_floor),
    foreign key (class_name) references class(class_name)
);

select * from member.info;
select * from forum.class;
INSERT INTO member.info (username, password) VALUES ('root', 'root');
insert into forum.postlist(class_name, title, content, user) values ('系統公告', '第一則貼文測試', '第一則貼文測試', 'root');
select * from forum.postlist;
select * from forum.postlist where class_name != '回收區' and post_exists = 1;
select * from forum.postlist where class_name != '回收區' and post_exists = 1 ORDER BY latestReply_time DESC LIMIT 0, 20;
select * FROM forum.postlist limit 20, 20;
select * FROM forum.postlist order by latestReply_time desc;
select * from forum.postlist where class_name in ('閒聊', '新手發問');
select * , DATE_FORMAT(latestReply_time, '%Y/%m/%d %H:%i') latestReply_time_format FROM forum.postlist;
select * , DATE_FORMAT(latestReply_time, '%Y/%m/%d %H:%i') latestReply_time_format FROM forum.postlist where class_name = '全部主題' ORDER BY latestReply_time DESC LIMIT 0, 20;
UPDATE forum.postlist set post_exists = 0, class_name = '回收區' where post_id = 3;

select * from forum.post_1;
select user, post_time from forum.post_2 ORDER BY post_time desc;
update forum.postlist set reply = ?, latestReply_user = ?, latestReply_time  = ? where post_id = ${post_id};


insert into forum.postlist(class_name, title, content, user) values ('all', '123', '123', 'a');
select username, headshot from member.info where username in ('a55688', 'a55688', 'ratuser', 'Testrat', 'beeeee', 'fireman', 'avc2b5kabrgv');

select * from forum.postlist where title = 123 or content = 123 or user = 123;
SELECT * from forum.postlist where post_exists = 1 and title like '%交換%' or content like '%交換%' or user like '%交換%';
SELECT * from forum.postlist where title like '%交換%';
-- drop database member;
drop table member.info;
drop table forum.postlist;
drop table forum.class;
drop table forum.post_2;

SELECT * FROM forum.post_1
SELECT *, DATE_FORMAT(post_time, '%Y/%m/%d %H:%i') post_time_format FROM forum.post_1

delete from forum.postlist where post_id < 4;
SELECT * FROM member.info where UserName = g;
SELECT * FROM member.info WHERE UserName

delete from member.info where id >= 48;

insert into forum.class(class_name_eng, class_name) values('all', '全部主題');
insert into forum.class(class_name_eng, class_name) values('complex', '綜合討論');
insert into forum.class(class_name_eng, class_name) values('gossip', '閒聊');
insert into forum.class(class_name_eng, class_name) values('ask', '新手發問');
insert into forum.class(class_name_eng, class_name) values('system', '系統公告');
insert into forum.class(class_name_eng, class_name) values('delete', '回收區');

insert into forum.post_17(class_name, title, content, user) values('新手發問', '測試標題', '測試貼文', 'root');

alter table member.info
	add column submitfrom char(10) default 'localhost';

-- try GCP SQL
select * , DATE_FORMAT(latestReply_time, '%Y/%m/%d %H:%i') latestReply_time_format FROM forum.postlist where class_name != '回收區' and post_exists = true ORDER BY latestReply_time DESC LIMIT 0, 20;
select * FROM forum.postlist where class_name != '回收區' and post_exists = true;