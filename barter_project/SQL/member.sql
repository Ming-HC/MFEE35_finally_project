-- 會員中心
create database if not exists membercenter
character set utf8mb4;
create table membercenter.personal
(`memberid` int primary key auto_increment, 
 `nickname` varchar(100) NULL, 
 `username` varchar(100) NULL, 
 `phone` varchar(12) NULL,
 `mail` varchar(200) NULL,
 `gender` char(8) NULL,
 `birth` varchar(40) NULL,
 `password` char(35) default null,
 `headshot` varchar(100) default null,
 `submitfrom` char(10) default 'local',
 `thirdtoken` char(70) DEFAULT NULL,
  `logined_times` int default '0',
  `register_time` timestamp default now()
 );

-- 交易紀錄
create table membercenter.record(
`recordid` int primary key auto_increment,
`memberid` int NOT NULL, 
`product` varchar(20) NOT NULL, 
`id2` int NOT NULL,
`product2` varchar(20) NOT NULL,
`success` varchar(10) NOT NULL,
`time` timestamp default now()  );

-- 我的商品
create table membercenter.MYproduct(
`MYproductid` int primary key auto_increment,
`MYproductimage` varchar(200) NOT NULL, 
`MYproductname` varchar(200) NOT NULL, 
`MYproductdetail` varchar(200) NOT NULL,
`MYproductcity` varchar(200) NOT NULL,
`MYproductuser_name` varchar(50) NOT NULL,
`time` timestamp default now()  );
