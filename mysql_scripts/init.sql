CREATE DATABASE IF NOT EXISTS hacky_wiki;

USE hacky_wiki;

CREATE TABLE IF NOT EXISTS users (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`provider` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
	`githubUsername` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
	`displayName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
	`avatarUrl` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
	`email` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS wiki_page (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`userId` int(11) unsigned NOT NULL,
	`title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
	`text` text COLLATE utf8mb4_unicode_ci NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`userId`) REFERENCES users(`id`),
	KEY `user_id` (`userId`)
);

CREATE TABLE IF NOT EXISTS wiki_page_tags (
	`wikiPageId` int(11) unsigned NOT NULL,
	`tag` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
	PRIMARY KEY (`wikiPageId`, `tag`)
);
