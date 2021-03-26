select p.id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts p
join helo_users u on u.id = p.author_id
where u.id not in(select id from helo_users where username = $1)
order by date_created desc;