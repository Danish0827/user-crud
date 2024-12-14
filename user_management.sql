-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2024 at 09:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `dob`) VALUES
(4, 'Danish Shaikh', 's.danish0827@gmail.com', '$2b$10$gti49FpghqzgeMNxLPwSCO0OWM9bfdaDubEvcPm834ueY5evi8x8W', '2001-03-27'),
(6, 'Rohan', 'rohan@gmail.com', '$2b$10$3381GNoopmWbcdp2ahxL9ua89Pgu4sMlYj7HS91IESChw/WMYdX8e', '2000-02-03'),
(7, 'danish', 'danish@gmail.com', '$2b$10$r12AxSoT2UVNc5lJ4zWK0OBWIEP/OJteqDDX1yY5VfL7xDaDCdJOm', '2005-07-10'),
(8, 'Jasar', 'jasar@gmail.com', '$2b$10$Go4h/BootS4vYOd1Ln3ly.id7XICTuR27ADYu4AJp7g8ktbb65eUG', '2003-12-17'),
(10, 'Sumit Sharma', 'sumit@gmail.com', '$2b$10$q.tdJzmsXFbxXK8BhXBxrOctK5KNITmuRTOMDpJeJuOEzaPaf5Lzq', '2000-02-17'),
(12, 'Aditi', 'aditi@gmail.com', '$2b$10$5xlIRU4M.Vk0rg17EdR65OXMhYr43rMi7iGmXrN0DT.m6sYAWfN2O', '1991-09-28'),
(13, 'Sohail Khan', 'sohailkhan@gmail.com', '$2b$10$eiEwcq4HrT.V3quYNygxS.vXUEwtCaD07TtTBeRIMFB6qaf1nUgiq', '1997-06-13'),
(14, 'Patil Aditi', 'patiladiti@gmail.com', '$2b$10$gq0HpfpXcDV5yzwRV9.zHODn1YJjjpgyG4CxU3nnHTm2fKN.L9k8q', '2006-02-02'),
(15, 'Yash', 'yash@gmail.com', '$2b$10$wE3Mys6UoR0ehV/w5UWc.uR9gVN9QyIoQWy.tiMfz4yMrKkc1iKlm', '1993-05-05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
