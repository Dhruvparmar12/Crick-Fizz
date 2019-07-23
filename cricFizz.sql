-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 22, 2019 at 04:49 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cricFizz`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `a_id` int(1) NOT NULL,
  `a_name` varchar(50) NOT NULL,
  `a_email` varchar(50) NOT NULL,
  `a_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`a_id`, `a_name`, `a_email`, `a_password`) VALUES
(1, 'Dhruv', 'dhruvrajput62@gmail.com', '$2b$10$viLVzWHH5cPxnqr.CM8pgunQOKcb2XtDLig9syfi1FksYSZeM1unq'),
(2, 'bhushan', 'bhushan123@gmail.com', '$2b$10$lLac7Vf9y.myOHU5q6ZwPOHHGqS0xkkMa.w7cjBIHBLdObb34OZza');

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `m_id` bigint(13) NOT NULL,
  `team_1` int(10) NOT NULL,
  `team_2` int(10) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `vanue` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`m_id`, `team_1`, `team_2`, `date`, `time`, `vanue`) VALUES
(2, 1, 2, '2019-07-29', '13:00:00', 'Kolkatta');

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `p_id` int(5) NOT NULL,
  `team_id` int(10) NOT NULL,
  `p_name` varchar(50) NOT NULL,
  `p_runs` int(5) NOT NULL,
  `p_type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`p_id`, `team_id`, `p_name`, `p_runs`, `p_type`) VALUES
(1, 1, 'Dhruv', 299, 'batsman'),
(2, 1, 'Shivam', 189, 'bowler'),
(3, 2, 'Dhruv', 360, 'bowler'),
(4, 1, 'Vivek', 160, 'batsman'),
(5, 1, 'Aditya', 500, 'batsman'),
(6, 1, 'Chahal', 500, 'wicketkeeper'),
(7, 1, 'Jignesh', 326, 'captain'),
(8, 1, 'Parth', 155, 'bowler'),
(9, 1, 'Rahul', 123, 'bowler'),
(10, 1, 'Kishan', 561, 'all-rounder'),
(11, 1, 'Dhaval', 189, 'all-rounuder');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `team_id` int(10) NOT NULL,
  `team_name` varchar(50) NOT NULL,
  `team_logo` varchar(255) NOT NULL,
  `team_desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`team_id`, `team_name`, `team_logo`, `team_desc`) VALUES
(1, 'India', 'india.jpg', 'Indian Team'),
(2, 'England', 'C:fakepathengland.png', 'England Team');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(50) NOT NULL,
  `u_email` varchar(50) NOT NULL,
  `u_password` varchar(255) NOT NULL,
  `u_profile` varchar(255) NOT NULL,
  `u_mobile` bigint(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`u_id`, `u_name`, `u_email`, `u_password`, `u_profile`, `u_mobile`) VALUES
(1, 'Bhushan', 'bhushan123@gmail.com', '$2b$10$mg6DSUf.Nm5El2jkCp14HubTCFQ0A9aN.K3Y9E/8aI7qegzfSydoS', 'mypic.jpeg', 1234566987),
(3, 'Bhushan', 'bhushan123@gmail.com', '$2b$10$DVRIKjrhgI/ic9Busqx6uueyXjCm4wXOdi2L7NFX9JsFqbORKuU3S', 'mypic.jpeg', 1234566987),
(4, 'Dhruv', 'dhruv1234@gmail.com', '$2b$10$SdfU2N/iLlJsu4NQxcFjL.iqDGpsddOAWhM0Rik/ZyBSEI.zWHTnS', 'mypic.jpeg', 7600959694),
(5, 'Jimit Raval', 'jimit123@gmail.com', '$2b$10$SrcJ3NznolnmRB3WjoLGGeNTdaALXNPvO2s8OI9Xh02BnVymO1Hi6', 'C:fakepathindia.png', 1234567890);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`m_id`),
  ADD KEY `team_1` (`team_1`),
  ADD KEY `team_2` (`team_2`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`team_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `a_id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `m_id` bigint(13) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `p_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `team_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`team_1`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`team_2`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `player_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
