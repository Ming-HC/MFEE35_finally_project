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









