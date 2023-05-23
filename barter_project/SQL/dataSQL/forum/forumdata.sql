-- forum.post_10 definition

CREATE table forum.post_10 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_10_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_11 definition

CREATE table forum.post_11 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_11_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_12 definition

CREATE table forum.post_12 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_12_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_13 definition

CREATE table forum.post_13 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_13_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_14 definition

CREATE table forum.post_14 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_14_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_15 definition

CREATE table forum.post_15 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_15_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_16 definition

CREATE table forum.post_16 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_16_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_17 definition

CREATE table forum.post_17 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_17_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_18 definition

CREATE table forum.post_18 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_18_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_19 definition

CREATE table forum.post_19 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_19_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_2 definition

CREATE table forum.post_2 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_2_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_20 definition

CREATE table forum.post_20 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_20_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_21 definition

CREATE table forum.post_21 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_21_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_22 definition

CREATE table forum.post_22 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_22_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_23 definition

CREATE table forum.post_23 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_23_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_24 definition

CREATE table forum.post_24 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_24_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_25 definition

CREATE table forum.post_25 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_25_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_26 definition

CREATE table forum.post_26 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_26_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_27 definition

CREATE table forum.post_27 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_27_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_28 definition

CREATE table forum.post_28 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_28_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_3 definition

CREATE table forum.post_3 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_3_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_4 definition

CREATE table forum.post_4 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_4_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_5 definition

CREATE table forum.post_5 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_5_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_6 definition

CREATE table forum.post_6 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_6_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_7 definition

CREATE table forum.post_7 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_7_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_8 definition

CREATE table forum.post_8 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_8_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- forum.post_9 definition

CREATE table forum.post_9 (
  `reply_floor` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `imageurl` varchar(200) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `post_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floor_exists` int(11) DEFAULT '1',
  PRIMARY KEY (`reply_floor`),
  KEY `class_name` (`class_name`),
  CONSTRAINT `post_9_ibfk_1` FOREIGN KEY (`class_name`) REFERENCES `class` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO forum.post_2 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('系統公告','系統改版，停機公告','root','','各位會員 好：

感謝大家長期以來對以物易物交換網的支持與鼓勵，為了提供更好的平台供大家使用，我們將於112年05月18日9點開始進行改版程序，屆時會暫時關閉網站，預計112年05月18日18點恢復運作，以全新的面貌呈現給大家，敬請期待！

以物易物交換網一直以來秉持著「物盡其用，讓資源不浪費」的理念提供這個公益平台，可惜樸實不華麗的我們近年來流失了許多會員，但我們仍然持續努力著。這次改版，希望大家能多多幫我們宣傳，邀請舊雨新知一起來以物易物，交換自己需要的物品。

同時麻煩各位會員在網站改版前，自行備份需要留存的物品資料及正在進行交易的紀錄，停機期間造成您的不便，敬請見諒！還請各位繼續支持以物易物交換網，希望這次改版能帶給您更好的體驗，若您使用後覺得滿意，請幫我們大力宣傳出去。不論是曾和您交易過卻許久未見的老朋友，還是有換物需求的新朋友，都歡迎來這裡以物易物。

我們衷心感謝您！謝謝！

以物易物交換網 站長 敬上.','2023-05-19 10:59:28',1);

INSERT INTO forum.post_3 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('閒聊','還有在換物的來簽到！！','john55688','','好無聊喔～超多提問不回的，有點考慮離開了！
換新版面，不知道人氣會不會旺一點。
很久沒互相符合需求的交換了！！','2023-05-19 11:14:13',0);

INSERT INTO forum.post_4 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','還有在換物的來簽到！！','john55688','img_5.png','好無聊喔～超多提問不回的，有點考慮離開了！
換新版面，不知道人氣會不會旺一點。
很久沒互相符合需求的交換了！！','2023-05-19 11:15:16',1);

INSERT INTO forum.post_5 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','能找一些同好來交換蓋過郵戳的郵票嗎？','john55688','','一直都有集郵的習慣，但來源實在有夠少，集郵已經30年了，以60後的銷票為主(只換有蓋過戳章的)，如果有興趣，麻煩email給我您的郵票，一起感受集郵所帶來的樂趣吧，謝謝大家！
choulily31@gmail.com
','2023-05-19 11:15:37',1);

INSERT INTO forum.post_6 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('新手發問','無法上傳圖片','jojo1679','','新進萌新。
圖片一直無法上傳，求解','2023-05-19 11:16:36',1);

INSERT INTO forum.post_7 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','要交流換物的來簽到哦~','v731219v','','歡迎多多交流~','2023-05-19 11:18:26',1);

INSERT INTO forum.post_8 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','剛來的新手多指教','v731219v','','店倒了我有一大堆庫存貨大多是文具、雜貨、手作材料等等。日後有時間會新增歡迎關注我','2023-05-19 11:18:44',1);

INSERT INTO forum.post_9 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('閒聊','多年後重新回歸','c954226','','大約7~8年前,小孩剛生沒多久時,發現這個網站,想當初在這換到了好多好多實用物品,為我那時省了不少費用,尤其是小孩的,後來忙於工作,就沒再來這了,現在家中有一堆網拍時的貨物,反正放著也是放著,不如再來這看看是否可以像當時一樣物儘其用,但多年後再來發現人變少了,物品少了,連提問也變少了,真的是歲月不饒人,連網站也如此啊','2023-05-19 11:19:40',1);

INSERT INTO forum.post_10 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('新手發問','請問各位換友如遇到雙方寄出運費有價差都如何處理？','backy20999','','雖然我已是元老級換家，但我第一次遇到雙方因為寄出方式不同，所以她希望我多給她東西貼補運費上的價差。寄送方式不是雙方協調好，自由選擇嗎？怎麼變成我寄7-11，她換給我的東西因為體積較大，7-11不收，又嫌郵局遠，所以想寄貨運，希望我貼補運費價差。那是不是如果我可以用郵局1號袋寄或者有跟便利帶簽約，郵資比較便宜就是我吃虧？都應該要貼補運費給換家？','2023-05-19 11:20:16',1);

INSERT INTO forum.post_11 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','回收廢電池','backy20999','','汽車廢電池可以賣幾百元喔','2023-05-19 11:20:37',1);

INSERT INTO forum.post_12 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','檸檬加酒精清潔劑如何製作','backy20999','','http://change.e1515.com.tw/Detail.php?ProductID=2172681
用於廁所去污超強
用於洗碗去油超強','2023-05-19 11:20:59',1);

INSERT INTO forum.post_13 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','不斷重複更新物品刊登！','oktonyi','img_6.png','請教小天使：可否設定物品.重新更新刊登時間！：不然疲勞轟炸！一直看到同一位換家不斷刊登同樣物品！也請給別人刊登新的物品的機會！謝謝！','2023-05-19 11:21:57',1);

INSERT INTO forum.post_14 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','每位換物者的物品展示版面，也能跟首頁的換物版面一樣，可以切換成並列模式。','matt919188','img_7.png','如題建議=>每位換物者的物品展示版面，也能跟首頁的換物版面一樣，可以切換成並列模式。','2023-05-19 11:22:50',1);

INSERT INTO forum.post_15 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('新手發問','「我的問答」是否能設計自由刪除？','matt919188','','希望系統能將「我的問答」這個部份，回覆問題後，任由換家選擇刪除與否，不然長時間下來，問答累積上百上千個，開啟後覺得很煩躁，希望系統能設計更簡化的自由刪除功能，目前只有尚未回答的可以提出刪除問題，沒回答就刪除不是很沒禮貌嗎？','2023-05-19 11:23:14',1);

INSERT INTO forum.post_16 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('新手發問','抽抽樂是啥玩意兒','n01z1a4n3uzv','','客服小天使您好，關於抽抽樂>抽點數存摺>花(200自動換花)的問題如下:
花好像有期限，覺得要給使用者一個按鈕(自行決定換成花的時間)，
或者都先設定成"不要"一滿200點就自動換成花(保留點數的意思)，
因為還未交換成功，不知道要送誰，亂送對方也不一定能回送，謝謝。','2023-05-19 11:23:47',1);

INSERT INTO forum.post_17 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('新手發問','如果被惡意給付評要如何處理','n01z1a4n3uzv','','我和換家svchau 換物.他寄來的東西跟照片網頁上的不符.寫信給他.他也不回.直接給我負評.請問要如何處理..我們規規矩矩在這換物換地很開心.確有這種人的出現....','2023-05-19 11:24:10',1);

INSERT INTO forum.post_18 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','無法更改物品','n01z1a4n3uzv','','一直顯示cannot read property ''value'' of undefined.
該填的都有填
請客服幫忙處理','2023-05-19 11:25:29',1);

INSERT INTO forum.post_19 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('新手發問','請問各位換友如遇到雙方寄出運費有價差都如何處理？','n01z1a4n3uzv','','雖然我已是元老級換家，但我第一次遇到雙方因為寄出方式不同，所以她希望我多給她東西貼補運費上的價差。寄送方式不是雙方協調好，自由選擇嗎？怎麼變成我寄7-11，她換給我的東西因為體積較大，7-11不收，又嫌郵局遠，所以想寄貨運，希望我貼補運費價差。那是不是如果我可以用郵局1號袋寄或者有跟便利帶簽約，郵資比較便宜就是我吃虧？都應該要貼補運費給換家？','2023-05-19 11:25:56',1);

INSERT INTO forum.post_20 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','三重換物社群','n01z1a4n3uzv','','歡迎三重人加入Line 社群
換 / 贈物 (三重區)
https://reurl.cc/3LjQ20','2023-05-19 11:26:18',1);

INSERT INTO forum.post_21 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','拿過期和快過期的東西想換別人高單價的商品','n01z1a4n3uzv','','發現一個奇葩,想用快過期的垃圾食品換別人的全新高單價商品,我覺得巳經不是臉皮厚,而是可能有精神病...','2023-05-19 11:26:36',1);

INSERT INTO forum.post_22 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','他是桃園平鎮的換家，希望只是我的想像','n01z1a4n3uzv','','昨天點了答應交易，也在時間內寄了，怕物品摔到也特地用宅配，突然接到一通未顯示號碼來電，沒問侯直接批口就問東西寄了沒？怎還沒收到，心想昨天完成交易，怎可能今天收到！對方電話直接掛掉。接下來利用悄悄話來問他，他一直逼問查單號碼，我直接給他，我反問他，那你寄了嗎？他說還沒，我整個傻眼！怎有這種換家…手機不通，自己沒寄，還質問別人寄了沒。','2023-05-19 11:26:52',1);

INSERT INTO forum.post_23 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','B群','n01z1a4n3uzv','','請問我有一瓶B群,在日本購買的,2020/8月到期,因為不能在網站上賣藥,會罰錢,可以用以物易物嗎?謝謝','2023-05-19 11:27:09',0);

INSERT INTO forum.post_24 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','請舉例最沒有價值的東西/你不想在這裡看見的東西','n01z1a4n3uzv','','保固無效；故障品；從飯店客房帶回的用具；股東與婚宴贈送的禮品；參考書，
因為這些都沒有價值，','2023-05-19 11:27:56',1),
	 (NULL,NULL,'catcute','','每個人看法不同','2023-05-19 11:57:18',1);

INSERT INTO forum.post_25 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','我快沒耐心','koyuku809','','主動問好幾個，每個回應信都一樣拒絕
','2023-05-19 11:28:40',1),
	 (NULL,NULL,'catsocute','','你好','2023-05-19 11:53:27',1);

INSERT INTO forum.post_26 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','大家好','catsocute','img_9.png','大家好 我是catsocute','2023-05-19 11:53:54',1);

INSERT INTO forum.post_27 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','hello ','catcute','','hello你好','2023-05-19 11:57:01',1);

INSERT INTO forum.post_28 (class_name,title,`user`,imageurl,content,post_time,floor_exists) VALUES
	 ('綜合討論','我是新手大家好','n01z1a4n3uzv','img_11.png','我是新手大家好','2023-05-19 11:58:48',1);
