-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2026 at 07:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_lapangan`
--

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE `jadwal` (
  `id` int(11) NOT NULL,
  `lapangan_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `status` enum('booked','ongoing','done','cancelled') DEFAULT 'booked'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`id`, `lapangan_id`, `user_id`, `tanggal`, `jam_mulai`, `jam_selesai`, `status`) VALUES
(4, 1, 7, '2026-05-06', '10:00:00', '12:00:00', 'cancelled'),
(5, 2, 7, '2026-05-06', '12:00:00', '13:00:00', 'done'),
(6, 1, 9, '2026-05-13', '10:00:00', '13:00:00', 'done'),
(7, 3, 10, '2026-05-14', '13:00:00', '15:00:00', 'ongoing'),
(8, 1, 7, '2026-05-14', '12:00:00', '15:00:00', 'cancelled');

-- --------------------------------------------------------

--
-- Table structure for table `lapangan`
--

CREATE TABLE `lapangan` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `harga_per_jam` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lapangan`
--

INSERT INTO `lapangan` (`id`, `nama`, `lokasi`, `harga_per_jam`) VALUES
(1, 'Lapangan Futsal A', 'Indoor', NULL),
(2, 'Lapangan Badminton 1', 'Hall', NULL),
(3, 'Lapangan Basket', 'Outdoor', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','member','operator') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(6, 'arya', '$2b$10$s4GlSaeZ/h15r8vEoOhC0OJkpsi3p9vj4dK.etXXOFSXzqubzQWAO', 'admin'),
(7, 'rani', '$2b$10$7pIM8CE2W50UYKAsTRHy5.cYPL/YO3lvUsYqI9GRRN03EdQUatrki', 'member'),
(8, 'cilo', '$2b$10$JFF.aTkYx1pPHKiaYCAh6.fCYuQtr7e9HRTQZE0.KSSpBUWwVfjPG', 'operator'),
(9, 'mimi', '$2b$10$onSnmG1FWJYWInEDTFaN3u.9AThbF1fy2Oa0WiGsI6wSs3vcyS8VW', 'member'),
(10, 'momo', '$2b$10$hPXA//fdG1QVLIJBKyPSNO2vCnsN74omJsaaZ91Zqs7wvPrp0WEdm', 'member');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lapangan_id` (`lapangan_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_tanggal` (`tanggal`);

--
-- Indexes for table `lapangan`
--
ALTER TABLE `lapangan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `lapangan`
--
ALTER TABLE `lapangan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD CONSTRAINT `jadwal_ibfk_1` FOREIGN KEY (`lapangan_id`) REFERENCES `lapangan` (`id`),
  ADD CONSTRAINT `jadwal_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
