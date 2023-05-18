create table product_page.QA 
(
    id int primary key AUTO_INCREMENT,
    product_id int not NULL,
    product_name varchar(100) not null,
    member_id int NOT NULL,
    username char(30) NOT NULL,
    content varchar(50) not null,
    reply varchar(100) default NULL,
    Question_date timestamp default now(),
    reply_date timestamp default now()
);

-- 不用假資料 請直接在網頁中登入使用者
-- 然後在問與答留言~


INSERT INTO `qa`(`id`, `product_id`, `product_name`, `member_id`, `username`, `content`, `reply`, `Question_date`, `reply_date`) VALUES ('1' , '2' , 'HTML書本' , '5' , 'mikudayo' , '請問方便約時間面交嗎?' , '可以唷 您方便什麼時候呢?' , '2023-05-12 22:42:22' , '2023-05-13 12:12:54') ;
INSERT INTO `qa`(`id`, `product_id`, `product_name`, `member_id`, `username`, `content`, `reply`, `Question_date`, `reply_date`) VALUES ('2' , '13' , '小鍵盤' , '6' , 'yutsuba' , '可以請問方便物流寄送嗎?' , '可以唷~' , '2023-05-12 20:42:59' , '2023-05-13 15:12:52') ;
INSERT INTO `qa`(`id`, `product_id`, `product_name`, `member_id`, `username`, `content`, `Question_date`) VALUES ('3' , '13' , '小鍵盤' , '3' , 'hansan' , '請問數量只有一個嗎?'  , '2023-05-01 22:42:50' ) ;
INSERT INTO `qa`(`id`, `product_id`, `product_name`, `member_id`, `username`, `content`, `Question_date`) VALUES ('4' , '13' , '小鍵盤' , '2' , 'hornet' , '請問尺寸大概多大呢?' , '2023-05-10 23:42:30' ) ;






