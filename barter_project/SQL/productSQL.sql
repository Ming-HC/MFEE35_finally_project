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
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('約會大作戰 錢包', '約會大作戰錢包 忍痛割愛' ,'/image/product/S__44769325.jpg','台中市','HORNET' , '/image/member/member01.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('HTML書本', 'HTML、CSS相關用法介紹!
近全新' ,'/image/product/S__44769327.jpg','台中市','kurumi' , '/image/member/member02.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('JS書本', 'HTML、CSS相關用法介紹!
近全新' ,'/image/product/S__44769328.jpg','台北市','mikudayo' , '/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('熱敷眼罩', '熱敷眼罩' ,'/image/product/S__44769329.jpg','台南市','yutsuba','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('英梨梨 PVC', '英梨梨PVC 二手 狀況良好' ,'/image/product/S__44769330.jpg','台北市','HANSAN','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('隨身碟', 'ADATA 16GB 全新品' ,'/image/product/S__44769331.jpg','高雄市','123456','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('牛仔褲', '七成新，用半年' ,'/image/product/牛仔褲.jpg','屏東市','itsuki','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('南瓜燈', '可愛南瓜燈! 限定商品~ 忍痛割愛!!!' ,'/image/product/南瓜燈.jpg','彰化市','一花','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('星巴克杯子', '' ,'/image/product/星巴克杯子.jpg','新竹市','八舞','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('憤怒鳥保溫杯', '全新保溫杯!' ,'/image/product/憤怒鳥保溫杯.jpg','基隆市','美九','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('法瑯鍋', '使用半年 外表近全新' ,'/image/product/法瑯鍋.jpg','新北市','崇宮零','/image/member/member03.jpg');
insert into product_page.product (product_name,product_detail,product_image,city,user_name, user_image) values ('卡娜赫拉玩偶', '全新品 沒用過! 只有拆外塑膠包裝' ,'/image/product/卡娜赫拉玩偶.jpg','台東市','柳神','/image/member/member03.jpg');
INSERT INTO product_page.product ( `product_name`, `product_image`, `product_detail`, `user_name`, `city`, `memo`, `lunch_date`) VALUES ('小鍵盤', '/image/product/小鍵盤.jpg', '九成新' , 'naruto', , '彰化縣', NULL, CURRENT_TIMESTAMP);


-- UPDATE `product` SET `user_image` = '/image/member/member01.jpg' WHERE `product`.`product_id` = 1;



-- 測試用 想加再加上
INSERT INTO `product` (`product_id`, `product_name`, `product_image`, `product_detail`, `user_name`, `user_image`, `city`, `memo`, `lunch_date`, `method`) VALUES (NULL, '小女孩12', '/image/product/106543200_p11.jpg', NULL, '柳神', NULL, '新北市', NULL, '2023-04-28 15:58:12', '面交/物流');
INSERT INTO `product` (`product_id`, `product_name`, `product_image`, `product_detail`, `user_name`, `user_image`, `city`, `memo`, `lunch_date`, `method`) VALUES (NULL, '小女孩4', '/image/product/106543200_p3.jpg', NULL, '三玖2號', NULL, '金門縣', NULL, '2023-04-28 15:58:35', '面交/物流');
INSERT INTO `product` (`product_id`, `product_name`, `product_image`, `product_detail`, `user_name`, `user_image`, `city`, `memo`, `lunch_date`, `method`) VALUES (NULL, '大美女', '/image/product/106543200_p12.jpg', NULL, '', '/image/member/member01.jpg', '彰化縣', NULL, '2023-05-09 15:37:14', '面交/物流');






-- 建議唯一鍵(禁止該欄位相同值)
-- ALTER TABLE product
-- add CONSTRAINT user_name_uq UNIQUE (user_name);