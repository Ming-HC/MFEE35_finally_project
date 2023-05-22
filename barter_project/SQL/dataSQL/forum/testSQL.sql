-- ming 測試用
select username, password from membercenter.personal where username = 'kittysocute';
delete from membercenter.personal where memberid >= 5;
SELECT username, headshot FROM member.info WHERE username in ()
select * from forum.post_1
select * from forum.postlist;
delete from forum.post_1 where reply_floor >= 1;
SELECT *, DATE_FORMAT(post_time, '%Y/%m/%d %H:%i') post_time_format FROM forum.post_2;