create database product_page default character set utf8;

-- 新增資料表
create table product_page.product 
(
 product_id int primary key auto_increment, 
 product_name varchar(100) not null,
 product_image varchar(100) not null,
 product_detail varchar(200),
 user_name varchar(100) DEFAULT '使用者',
 user_image varchar(100) ,
 city varchar(20) not null,
 memo varchar(100), 
 lunch_date timestamp default now(),
 method varchar(6) default '面交/物流',
 INDEX(method)-- Add index to the "method" column
  );

-- 新增資料
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩1', '柳神，是辰東所著東方玄幻小説《完美世界》《聖墟》中的重要人物，無上仙王巨頭，風華絕代，實力通天。號稱祖祭靈，功參造化，一身戰力震古爍今，曾隻身殺入異域，九進九出，殺得異域不朽之王聞風喪膽。' ,'/image/product/106543200_p0.jpg','台中市','狂三' , '/image/member/member01.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩2', '有沒有人要買女孩?' ,'/image/product/106543200_p1.jpg','台中市','鳶一' , '/image/member/member02.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩3', '我要我要!' ,'/image/product/106543200_p2.jpg','台北市','二乃' , '/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩4', '羅莉控?' ,'/image/product/106543200_p3.jpg','台南市','三玖','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩5', '我大三玖!' ,'/image/product/106543200_p4.jpg','台北市','四糸乃','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩6', '嗯!你說的沒錯!' ,'/image/product/106543200_p5.jpg','高雄市','四葉','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩7', 'aa' ,'/image/product/106543200_p6.jpg','屏東市','五月','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩8', 'bb' ,'/image/product/106543200_p7.jpg','彰化市','一花','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩9', 'cc' ,'/image/product/106543200_p8.jpg','新竹市','八舞','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩10', 'dd' ,'/image/product/106543200_p9.jpg','基隆市','美九','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩11', 'ee' ,'/image/product/106543200_p10.jpg','新北市','崇宮零','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('小女孩12', 'gg' ,'/image/product/106543200_p11.jpg','台東市','柳神','/image/member/member03.jpg');
INSERT INTO product_page.product ( `product_name`, `product_image`, `product_detail`, `user_name`, `user_image`, `city`, `memo`, `lunch_date`) VALUES ('大美女', '/image/product/106543200_p12.jpg', 'XD' , '測試人員1號', '/image/member/test1.jpg', '彰化縣', NULL, CURRENT_TIMESTAMP);


-- UPDATE `product` SET `user_image` = '/image/member/member01.jpg' WHERE `product`.`product_id` = 1;



-- 測試用 想加再加上
INSERT INTO `product` (`product_id`, `product_name`, `product_image`, `product_detail`, `user_name`, `user_image`, `city`, `memo`, `lunch_date`, `method`) VALUES (NULL, '小女孩12', '/image/product/106543200_p11.jpg', NULL, '柳神', NULL, '新北市', NULL, '2023-04-28 15:58:12', '面交/物流');
INSERT INTO `product` (`product_id`, `product_name`, `product_image`, `product_detail`, `user_name`, `user_image`, `city`, `memo`, `lunch_date`, `method`) VALUES (NULL, '小女孩4', '/image/product/106543200_p3.jpg', NULL, '三玖2號', NULL, '金門縣', NULL, '2023-04-28 15:58:35', '面交/物流');
INSERT INTO `product` (`product_id`, `product_name`, `product_image`, `product_detail`, `user_name`, `user_image`, `city`, `memo`, `lunch_date`, `method`) VALUES (NULL, '大美女', '/image/product/106543200_p12.jpg', NULL, '', '/image/member/member01.jpg', '彰化縣', NULL, '2023-05-09 15:37:14', '面交/物流');






-- 建議唯一鍵(禁止該欄位相同值)
-- ALTER TABLE product
-- add CONSTRAINT user_name_uq UNIQUE (user_name);