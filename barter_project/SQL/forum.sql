-- forum
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
`title` varchar(40) not null,
`imageurl` varchar(50) default null,
`content` varchar(140) not null,
`user` varchar(20) not null,
`reply` int(10) default 0,
`views` int(10) default 0,
`post_time` timestamp default now(), -- 發文時間
`latestReply_user` varchar(20) default null,
`latestReply_time` timestamp default now(),
`post_exists` int default 1,
primary key (`post_id`),
foreign key (class_name) references class(class_name)
) AUTO_INCREMENT=2;
insert into forum.class(class_name_eng, class_name) values('all', '全部主題');
insert into forum.class(class_name_eng, class_name) values('complex', '綜合討論');
insert into forum.class(class_name_eng, class_name) values('gossip', '閒聊');
insert into forum.class(class_name_eng, class_name) values('ask', '新手發問');
insert into forum.class(class_name_eng, class_name) values('system', '系統公告');
insert into forum.class(class_name_eng, class_name) values('delete', '回收區');
-- 以上需手動 建db只需到這 下面測試用及動態生成