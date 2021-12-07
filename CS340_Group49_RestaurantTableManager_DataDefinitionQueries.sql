-- Course:        CS 340 - Fall 2021
-- Assignment:    Project Step 6 Draft Version: Implement UPDATE and DELETE operations
-- Group:         49
-- Team members:  Chi Hang Leung, Tobi Fanibi
-- Team’s name:   DROP TABLE mic;
-- Project Title: Restaurant Table Manager

-- --------------------------------------------------------

-- phpMyAdmin SQL Dump
-- version 5.1.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 12, 2021 at 12:00 AM
-- Server version: 10.4.21-MariaDB-log
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_leunchih`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--
-- Creation: Nov 11, 2021 at 10:48 PM
-- Last update: Nov 11, 2021 at 11:02 PM
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `customers`:
--

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `customer_name`, `customer_phone`) VALUES
(1, 'Alice', '740-670-3014'),
(2, 'Bob', '821-233-7158'),
(3, 'Charlie', ''),
(4, 'Denise', '464-926-7400'),
(5, 'Ethan', '415-994-6500'),
(6, 'Florence', NULL),
(7, 'Gaby', NULL),
(8, 'Harry', '415-994-6500'),
(9, 'Ian', '382-509-3857'),
(10, 'Jake', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dining_tables`
--
-- Creation: Nov 11, 2021 at 11:28 PM
-- Last update: Nov 11, 2021 at 11:32 PM
--

DROP TABLE IF EXISTS `dining_tables`;
CREATE TABLE `dining_tables` (
  `table_id` int(11) NOT NULL,
  `num_seat` int(11) NOT NULL,
  `feature_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `dining_tables`:
--   `feature_id`
--       `table_features` -> `feature_id`
--

--
-- Dumping data for table `dining_tables`
--

INSERT INTO `dining_tables` (`table_id`, `num_seat`, `feature_id`) VALUES
(1, 2, 2),
(2, 2, 1),
(3, 4, NULL),
(4, 4, 2),
(5, 6, NULL),
(6, 6, 2),
(7, 8, NULL),
(8, 8, 1),
(9, 10, 3),
(10, 10, 3);

-- --------------------------------------------------------

--
-- Table structure for table `table_features`
--
-- Creation: Nov 11, 2021 at 11:21 PM
-- Last update: Nov 11, 2021 at 11:31 PM
--

DROP TABLE IF EXISTS `table_features`;
CREATE TABLE `table_features` (
  `feature_id` int(11) NOT NULL,
  `feature_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `table_features`:
--

--
-- Dumping data for table `table_features`
--

INSERT INTO `table_features` (`feature_id`, `feature_description`) VALUES
(1, 'Wheelchair Accessible'),
(2, 'Ocean View'),
(3, 'Private Party Room');

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--
-- Creation: Nov 11, 2021 at 10:56 PM
-- Last update: Nov 11, 2021 at 11:50 PM
--

DROP TABLE IF EXISTS `visits`;
CREATE TABLE `visits` (
  `visit_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `waiter_id` int(11) NOT NULL,
  `num_guest` int(11) NOT NULL,
  `time_start` bigint NOT NULL,
  `time_stop` bigint NOT NULL,
  `check_amount` decimal(5,2) NOT NULL,
  `tips_amount` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `visits`:
--   `customer_id`
--       `customers` -> `customer_id`
--   `table_id`
--       `dining_tables` -> `table_id`
--   `waiter_id`
--       `waiters` -> `waiter_id`
--

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`visit_id`, `table_id`, `customer_id`, `waiter_id`, `num_guest`, `time_start`, `time_stop`, `check_amount`, `tips_amount`) VALUES
(1, 4, 1, 3, 3, '2021-11-10 13:39:02', '2021-11-10 18:45:02', '63.13', '15.20'),
(2, 9, 4, 2, 8, '2021-11-10 06:23:02', '2021-11-10 18:45:02', '200.10', '40.80'),
(3, 10, 8, 1, 10, '2021-11-10 07:27:02', '2021-11-10 18:45:02', '305.13', '60.66'),
(4, 1, 10, 4, 1, '2021-11-10 15:45:02', '2021-11-10 18:45:02', '23.44', '3.50'),
(5, 6, 6, 3, 4, '2021-11-10 18:51:02', '2021-11-10 18:45:02', '60.13', '13.21');

-- --------------------------------------------------------

--
-- Table structure for table `waiters`
--
-- Creation: Nov 11, 2021 at 09:56 PM
-- Last update: Nov 11, 2021 at 11:11 PM
--

DROP TABLE IF EXISTS `waiters`;
CREATE TABLE `waiters` (
  `waiter_id` int(11) NOT NULL,
  `waiter_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `waiters`:
--

--
-- Dumping data for table `waiters`
--

INSERT INTO `waiters` (`waiter_id`, `waiter_name`) VALUES
(1, 'Zoe'),
(2, 'Yang'),
(3, 'Xavier'),
(4, 'William'),
(5, 'Victoria');

-- --------------------------------------------------------

--
-- Table structure for table `waiting_lists`
--
-- Creation: Nov 11, 2021 at 11:40 PM
-- Last update: Nov 11, 2021 at 11:44 PM
--

DROP TABLE IF EXISTS `waiting_lists`;
CREATE TABLE `waiting_lists` (
  `queue_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `num_seat` int(11) NOT NULL,
  `reserved_time` bigint NOT NULL,
  `requested_feature_id` int(11) DEFAULT NULL,
  `is_seated` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `waiting_lists`:
--   `customer_id`
--       `customers` -> `customer_id`
--   `requested_feature_id`
--       `table_features` -> `feature_id`
--

--
-- Dumping data for table `waiting_lists`
--

INSERT INTO `waiting_lists` (`queue_id`, `customer_id`, `num_seat`, `reserved_time`, `requested_feature_id`, `is_seated`) VALUES
(1, 3, 3, '2021-11-11 12:37:02', NULL, 1),
(2, NULL, 7, '2021-11-11 14:37:02', 3, 0),
(3, 4, 1, '2021-11-11 16:37:02', 1, 1),
(4, 10, 10, '2021-11-11 18:37:02', 3, 0),
(5, 5, 9, '2021-11-11 20:37:02', 2, 0),
(6, 2, 2, '2021-11-11 18:42:56', 2, 0),
(7, 5, 6, '2021-11-11 19:42:56', 1, 0),
(8, 9, 4, '2021-11-11 20:42:56', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `dining_tables`
--
ALTER TABLE `dining_tables`
  ADD PRIMARY KEY (`table_id`),
  ADD KEY `FK_dt_feature_id` (`feature_id`);

--
-- Indexes for table `table_features`
--
ALTER TABLE `table_features`
  ADD PRIMARY KEY (`feature_id`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`visit_id`),
  ADD KEY `FK_v_customer_id` (`customer_id`),
  ADD KEY `FK_v_table_id` (`table_id`),
  ADD KEY `FK_v_waiter_id` (`waiter_id`);

--
-- Indexes for table `waiters`
--
ALTER TABLE `waiters`
  ADD PRIMARY KEY (`waiter_id`);

--
-- Indexes for table `waiting_lists`
--
ALTER TABLE `waiting_lists`
  ADD PRIMARY KEY (`queue_id`),
  ADD KEY `FK_wl_customer_id` (`customer_id`),
  ADD KEY `FK_wl_feature_id` (`requested_feature_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `dining_tables`
--
ALTER TABLE `dining_tables`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `table_features`
--
ALTER TABLE `table_features`
  MODIFY `feature_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `visit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `waiters`
--
ALTER TABLE `waiters`
  MODIFY `waiter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `waiting_lists`
--
ALTER TABLE `waiting_lists`
  MODIFY `queue_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dining_tables`
--
ALTER TABLE `dining_tables`
  ADD CONSTRAINT `FK_dt_feature_id` FOREIGN KEY (`feature_id`) REFERENCES `table_features` (`feature_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `visits`
--
ALTER TABLE `visits`
  ADD CONSTRAINT `FK_v_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_v_table_id` FOREIGN KEY (`table_id`) REFERENCES `dining_tables` (`table_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_v_waiter_id` FOREIGN KEY (`waiter_id`) REFERENCES `waiters` (`waiter_id`) ON UPDATE CASCADE;

--
-- Constraints for table `waiting_lists`
--
ALTER TABLE `waiting_lists`
  ADD CONSTRAINT `FK_wl_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_wl_feature_id` FOREIGN KEY (`requested_feature_id`) REFERENCES `table_features` (`feature_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
