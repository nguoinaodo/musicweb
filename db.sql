create schema `musicweb` default charset utf8 collate utf8_general_ci;
use `musicweb`;

create table `admin` (
	`adminId` int not null auto_increment,
    `username` varchar(128),
    `password` varchar(128),
    `priority` tinyint,
    `email` varchar(128),
    primary key (`adminId`)
);

create table `song` (
	`songId` int not null auto_increment,
    `name` varchar(100) not null,
    `description` mediumtext,
    `dateTime` dateTime,
    `type` tinyint default 0, -- 0 - song, 1 - music video
    `listen` int default 0,
    `download` int default 0,
    `userId` int not null,
    `zoneId` int,
    `categoryId` int,
    `authorId` int,
    primary key (`songId`)
);

create table `user` (
	`userId` int not null auto_increment,
    `username` varchar(128),
    `email` varchar(128) not null,
    `password` varchar(128),
    `displayName` varchar(128),
    `birthday` date,
    `livingIn` varchar(128),
    primary key (`userId`)
);

create table `artist` (
	`artistId` int not null auto_increment,
    `name` varchar(128),
    `type` tinyint, -- 0 - singer, 1 - band
    `description` mediumtext,
    primary key (`artistId`)
);

create table `author` (
	`authorId` int not null auto_increment,
    `name` varchar(128),
    `description` mediumtext,
    primary key (`authorId`)
);

create table `playlist` (
	`playlistId` int not null auto_increment,
    `name` varchar(128),
    `description` mediumtext,
    `type` tinyint,
    `isVerify` boolean,
    `dateTime` dateTime,
    `userId` int not null,
    primary key (`playlistId`)
);
create table `zone` (
	`zoneId` int not null auto_increment,
    `name` varchar(64),
    primary key (`zoneId`)
);

create table `category` (
	`categoryId` int not null auto_increment,
    `name` varchar(64),
    primary key (`categoryId`)
);

CREATE TABLE `comment_song` (
   `commentId` int auto_increment,
   `userId` int not null,
 `contents` text not null,
`songId` int not null,
`dateTime` dateTime not null,
primary key (`commentId`, `userId`, `songId`)
);


create table `comment_playlist` (
   `commentId` int auto_increment,
   `userId` int not null,
 `contents` text not null,
`playlistId` int not null,
`dateTime` dateTime not null,
    primary key (`commentId`, `userId`, `playlistId`)
);

create table `present` (
	`songId` int not null,
    `artistId` int not null,
    primary key (`songId`, `artistId`)
);

create table `song_in_playlist` (
	`songId` int not null,
    `playlistId` int not null,
    `order` int,
    primary key (`songId`, `playlistId`)
);

alter table `song` 
    add constraint `song_userId` foreign key (`userId`) references `user`(`userId`) on delete cascade,
    add constraint `song_zoneId` foreign key (`zoneId`) references `zone`(`zoneId`) on delete cascade,
    add constraint `song_categoryId` foreign key (`categoryId`) references `category`(`categoryId`) on delete cascade,
    add constraint `song_authorId` foreign key (`authorId`) references `author`(`authorId`) on delete cascade;

alter table `playlist` 
    add constraint `playlist_userId` foreign key (`userId`) references `user`(`userId`) on delete cascade;

alter table `comment_song`
    add constraint `comment_song_userId` foreign key (`userId`) references `user`(`userId`) on delete cascade,
    add constraint `comment_song_songId` foreign key (`songId`) references `song`(`songId`) on delete cascade;

alter table `comment_playlist`
    add constraint `comment_playlist_userId` foreign key (`userId`) references `user`(`userId`) on delete cascade,
    add constraint `comment_playlist_playlistId` foreign key (`playlistId`) references `playlist`(`playlistId`) on delete cascade;

alter table `present` 
    add constraint `present_songId` foreign key (`songId`) references `song`(`songId`) on delete cascade,
    add constraint `present_artistId` foreign key (`artistId`) references `artist`(`artistId`) on delete cascade;

alter table `song_in_playlist`
    add constraint `song_in_playlist_songId` foreign key (`songId`) references `song`(`songId`) on delete cascade,
    add constraint `song_in_playlist_playlistId` foreign key (`playlistId`) references `playlist`(`playlistId`) on delete cascade;

alter table song add column link varchar(128);
alter table `user` add column gender tinyint ;
alter table user add column isBlock boolean default true;
