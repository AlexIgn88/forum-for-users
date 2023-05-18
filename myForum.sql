-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               11.0.1-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Дамп данных таблицы myforum.posts: ~15 rows (приблизительно)
INSERT INTO `posts` (`id`, `userId`, `title`, `body`, `time`) VALUES
	(1, 2, 'Hello all!', 'Hi, folks!', '2023-05-12 13:10:16'),
	(2, 1, 'Greeting', 'Hello, my friend!', '2023-05-12 13:29:25'),
	(3, 1, 'Weather', 'What\'s the weather like today?', '2023-05-12 13:30:30'),
	(4, 2, 'Weather', 'The weather is great! It\'s really sunny right now.', '2023-05-12 17:20:09'),
	(5, 1, 'Weather', 'Let\'s have a picnic!', '2023-05-12 17:36:08'),
	(6, 2, 'picnic', 'OK!', '2023-05-13 07:10:09'),
	(7, 1, 'picnic', ' THX!', '2023-05-13 07:10:36'),
	(8, 1, 'picnic', ' Today?', '2023-05-13 07:17:13'),
	(9, 2, 'picnic', ' yes!', '2023-05-13 07:17:26'),
	(10, 4, 'picnic', ' Can I join?', '2023-05-13 22:41:30'),
	(17, 2, 'picnic', 'Yes, welcome, dude!', '2023-05-17 17:29:57'),
	(18, 3, 'picnic', ' Hi all!', '2023-05-17 17:31:16'),
	(19, 5, 'picnic', ' Hey! We need meat', '2023-05-18 19:11:49'),
	(20, 6, 'picnic', 'And we need some fire...', '2023-05-18 19:22:21'),
	(21, 7, 'picnic', ' I can help light a fire', '2023-05-18 19:25:17');

-- Дамп данных таблицы myforum.sessions: ~14 rows (приблизительно)
INSERT INTO `sessions` (`id`, `userId`, `secret`) VALUES
	(89, 1, '0.19856911643664477'),
	(103, 1, '0.005295320692169314'),
	(107, 1, '0.24302135996926055'),
	(163, 1, '0.14768353317614302'),
	(164, 1, '0.7679329268205712'),
	(165, 1, '0.9149564557650405'),
	(166, 1, '0.9280392840705247'),
	(167, 1, '0.07082391788010733'),
	(168, 1, '0.5254438487781705'),
	(169, 1, '0.3336583086203515'),
	(170, 1, '0.3510844158174642'),
	(171, 1, '0.08988024086358548'),
	(172, 1, '0.41902198160811177'),
	(184, 1, '0.8998931385916289');

-- Дамп данных таблицы myforum.users: ~9 rows (приблизительно)
INSERT INTO `users` (`id`, `login`, `psw`, `realname`) VALUES
	(1, 'user', '*7C2865310ECCDD62F5BCA98936223240F1E8C1A6', '👤USER'),
	(2, 'admin', '*5B3BD82ACFE5938026B3001B2540B9C3EB242DD8', '👑ADMIN'),
	(3, 'masha', '*7C2865310ECCDD62F5BCA98936223240F1E8C1A6', 'MASHA'),
	(4, 'father', '*C4D0A94DE0F05EDE0A6DC893625B51B7C0BB5B56', 'father36'),
	(5, 'lena', '*61FAB168C51EB055D886796F45907F39B0556F7A', 'Alenka'),
	(6, 'anna', '*F6BF12F3D1B5A8E73F15AAEB0FB15682AD5A8DB0', 'Melisandra A.'),
	(7, 'jon', '*7DC74F5CF4847D9BECA401984B23B78F6D2DCE02', 'Jon Snow'),
	(8, 'max', '*168C8E16D27F6D08CD861A79F56C3F89E909BE6C', 'Max Payne'),
	(9, 'igor', '*B4DD573F536B738BE58D5DA9B2EB3537BE831314', 'Igorek2077');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
