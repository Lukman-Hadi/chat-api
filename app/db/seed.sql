-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2022 at 08:56 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_db`
--

--
-- Truncate table before insert `conversations`
--

TRUNCATE TABLE `conversations`;
--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, NULL, '2022-08-06 02:27:14', '2022-08-06 02:27:14'),
(2, NULL, '2022-08-06 02:30:16', '2022-08-06 02:30:16'),
(3, NULL, '2022-08-06 02:31:17', '2022-08-06 02:31:17'),
(4, NULL, '2022-08-06 02:41:42', '2022-08-06 02:41:42'),
(5, NULL, '2022-08-06 05:55:34', '2022-08-06 05:55:34');

--
-- Truncate table before insert `conversation_member`
--

TRUNCATE TABLE `conversation_member`;
--
-- Dumping data for table `conversation_member`
--

INSERT INTO `conversation_member` (`id`, `user_id`, `conversation_id`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, '2022-08-06 02:27:14', '2022-08-06 02:27:14'),
(2, 1, 1, '2022-08-06 02:27:14', '2022-08-06 02:27:14'),
(3, 2, 2, '2022-08-06 02:30:16', '2022-08-06 02:30:16'),
(4, 3, 2, '2022-08-06 02:30:16', '2022-08-06 02:30:16'),
(5, 2, 3, '2022-08-06 02:31:17', '2022-08-06 02:31:17'),
(6, 4, 3, '2022-08-06 02:31:17', '2022-08-06 02:31:17'),
(7, 1, 4, '2022-08-06 02:41:42', '2022-08-06 02:41:42'),
(8, 3, 4, '2022-08-06 02:41:42', '2022-08-06 02:41:42'),
(9, 2, 5, '2022-08-06 05:55:34', '2022-08-06 05:55:34'),
(10, 5, 5, '2022-08-06 05:55:34', '2022-08-06 05:55:34');

--
-- Truncate table before insert `messages`
--

TRUNCATE TABLE `messages`;
--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `text`, `sent_datetime`, `read`, `read_datetime`, `user_id`, `conversation_id`, `createdAt`, `updatedAt`) VALUES
(1, 'hello first message', '2022-08-06 02:27:14', 0, NULL, 2, 1, '2022-08-06 02:27:14', '2022-08-06 02:27:14'),
(2, 'hello first message', '2022-08-06 02:29:42', 0, NULL, 2, 1, '2022-08-06 02:29:42', '2022-08-06 02:29:42'),
(3, 'hello first message', '2022-08-06 02:30:16', 1, '2022-08-06 05:50:16', 2, 2, '2022-08-06 02:30:16', '2022-08-06 05:50:16'),
(4, 'hello second message', '2022-08-06 02:30:30', 1, '2022-08-06 05:50:16', 2, 2, '2022-08-06 02:30:30', '2022-08-06 05:50:16'),
(5, 'hello third message', '2022-08-06 02:30:51', 1, '2022-08-06 05:50:16', 2, 2, '2022-08-06 02:30:51', '2022-08-06 05:50:16'),
(6, 'hello third message', '2022-08-06 02:30:59', 0, NULL, 2, 1, '2022-08-06 02:30:59', '2022-08-06 02:30:59'),
(7, 'hello first message', '2022-08-06 02:31:17', 0, NULL, 2, 3, '2022-08-06 02:31:17', '2022-08-06 02:31:17'),
(8, 'hello from me', '2022-08-06 02:33:22', 1, '2022-08-06 05:54:11', 1, 1, '2022-08-06 02:33:22', '2022-08-06 05:54:11'),
(9, 'hello from me AGAIN', '2022-08-06 02:34:09', 1, '2022-08-06 05:54:11', 1, 1, '2022-08-06 02:34:09', '2022-08-06 05:54:11'),
(10, 'hello from me AGAIN', '2022-08-06 02:40:05', 1, '2022-08-06 05:54:11', 1, 1, '2022-08-06 02:40:05', '2022-08-06 05:54:11'),
(11, 'hello from me AGAIN', '2022-08-06 02:40:43', 1, '2022-08-06 05:54:11', 1, 1, '2022-08-06 02:40:43', '2022-08-06 05:54:11'),
(12, 'hello from me AGAIN', '2022-08-06 02:40:57', 1, '2022-08-06 05:54:11', 1, 1, '2022-08-06 02:40:57', '2022-08-06 05:54:11'),
(13, 'hello from me AGAIN', '2022-08-06 02:41:42', 1, '2022-08-06 03:02:30', 1, 4, '2022-08-06 02:41:42', '2022-08-06 03:02:30'),
(14, 'hello from me AGAIN', '2022-08-06 02:43:05', 1, '2022-08-06 03:02:30', 1, 4, '2022-08-06 02:43:05', '2022-08-06 03:02:30'),
(15, 'hello from me AGAIN', '2022-08-06 02:43:08', 1, '2022-08-06 03:02:30', 1, 4, '2022-08-06 02:43:08', '2022-08-06 03:02:30'),
(18, 'test', '2022-08-06 03:00:00', 1, '2022-08-06 03:02:30', 1, 4, '2022-08-06 03:00:00', '2022-08-06 03:02:30'),
(19, 'test', '2022-08-06 03:02:30', 0, NULL, 3, 4, '2022-08-06 03:02:30', '2022-08-06 03:02:30'),
(20, 'halo from auth', '2022-08-06 05:54:11', 0, NULL, 2, 1, '2022-08-06 05:54:11', '2022-08-06 05:54:11'),
(21, 'halo from auth', '2022-08-06 05:55:34', 1, '2022-08-06 06:52:46', 2, 5, '2022-08-06 05:55:34', '2022-08-06 06:52:46'),
(22, 'hal juga', '2022-08-06 05:58:01', 0, NULL, 5, 5, '2022-08-06 05:58:01', '2022-08-06 05:58:01');

--
-- Truncate table before insert `users`
--

TRUNCATE TABLE `users`;
--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `createdAt`, `updatedAt`, `token`) VALUES
(1, 'lukman', '2022-08-06 01:46:44', '2022-08-06 05:32:36', '8800fbb497b61a03b3c7cce60c704758e509bc0f54421bf8b97e9ddc1f6a1c17'),
(2, 'hadi', '2022-08-06 01:46:48', '2022-08-06 05:52:31', '11c1217f68c5c3b0e1bc34c453ca16ee336fd11eccfc535aa52ed554afc07ff5'),
(3, 'lukmanhadi', '2022-08-06 01:46:54', '2022-08-06 01:46:54', NULL),
(4, 'budi', '2022-08-06 01:47:03', '2022-08-06 01:47:03', NULL),
(5, 'doremi', '2022-08-06 01:47:06', '2022-08-06 05:56:13', '1a5b1220dd452c5400a741eed06aba21e354e5238bc216e6442421bc57e981d0'),
(6, 'anto', '2022-08-06 01:47:22', '2022-08-06 01:47:22', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
