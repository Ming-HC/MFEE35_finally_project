create table product_page.BWC
(
 id int(11) primary key auto_increment,
 BWC_user_name varchar(30) default NULL,
 BWC_product_id int ,
 BWC_product_name varchar(100) default NULL,
 BWC_product_image varchar(100) default NULL,
 BWC_city varchar(20) default NULL,
 BWC_lunch_date varchar(20) default NULL,
 BWC_method varchar(6) NOT NULL DEFAULT '面交/物流',
 WC_user_name varchar(30) default NULL,
 WC_product_id int ,
 WC_product_name varchar(100) default NULL,
 WC_product_image varchar(100) default NULL,
 WC_city varchar(20) default NULL,
 WC_lunch_date varchar(20) default NULL,
 WC_method varchar(6) NOT NULL DEFAULT '面交/物流',
 dill_date timestamp default now(),
 FOREIGN KEY (BWC_product_id) REFERENCES product_page.product (product_id)
--  FOREIGN KEY (WC_product_id) REFERENCES product_page.product (product_id)
  );




-- 假資料
-- 成功


-- 先輸入一半
INSERT INTO product_page.bwc (BWC_user_name, BWC_product_id, BWC_product_name, BWC_product_image, BWC_city, BWC_lunch_date)
SELECT user_name , product_id , product_name , product_image , city , lunch_date	
FROM product_page.product
WHERE product_id = 2;

-- 在更新另一半


UPDATE product_page.bwc
INNER JOIN product_page.product
ON product_page.product.product_id = 3
SET
  bwc.WC_user_name = product.user_name,
  bwc.WC_product_id = product.product_id,
  bwc.WC_product_name = product.product_name,
  bwc.WC_product_image = product.product_image,
  bwc.WC_city = product.city,
  bwc.WC_lunch_date = product.lunch_date
WHERE bwc.BWC_product_id = 2;