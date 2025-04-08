-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2025 at 11:06 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoes_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `slug`) VALUES
('1', 'مردانه', 'men'),
('120249a6-9265-4a75-8257-dd925108d52b', 'زنانه', 'women'),
('701991b2-1b4a-48c4-b197-e3af19368a69', 'دست بند', 'hand'),
('7923c375-d118-4cab-9b3e-7431a5f2c45d', 'بچگانه', 'kids');

-- --------------------------------------------------------

--
-- Table structure for table `shoe`
--

CREATE TABLE `shoe` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `categoryId` varchar(191) NOT NULL,
  `existing` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `mainColor` varchar(191) NOT NULL,
  `secondaryColor` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shoe`
--

INSERT INTO `shoe` (`id`, `name`, `description`, `price`, `categoryId`, `existing`, `createdAt`, `mainColor`, `secondaryColor`) VALUES
('343d7469-414c-438b-9b3f-a804f23576d9', 'AirJORDAN ', 'AirJORDAN ONE LOW', 400, '1', 1, '2025-03-27 01:11:14.217', '#d1cdca', '#384359'),
('3a41ebef-675c-4d9e-a53e-7163c81fb46c', 'AirJordan Custom', 'AirJordan Custom Brown', 542000, '1', 1, '2025-03-27 01:17:07.661', '#dddddb', '#aa947c'),
('90ac1ef2-1cd5-4584-9931-5f9edd612c71', 'Custom Nike P600', 'Nike Gold white', 1400, '1', 1, '2025-03-27 00:13:59.637', '#ccad3e', '#ffffff'),
('a63be5ed-b78d-44b8-9260-344f21ec4a2d', 'AIRDORDAN 1', 'AIRJORDAN YELLOW BLACK', 8000, '1', 1, '2025-03-27 01:09:08.802', '#000000', '#fed227'),
('a9600e30-aa5c-44e6-b1b5-eb8d06b3c606', 'Nike AirJordan Low ', 'Nike Low White Blue', 400, '1', 1, '2025-03-27 00:15:37.391', '#dedede', '#060486'),
('adeb5ed4-0372-4b9f-a9d8-baa20346928b', 'AirJordan Mid Pink', 'AirJordan Mid Pink white', 5000, '120249a6-9265-4a75-8257-dd925108d52b', 1, '2025-03-27 01:13:33.963', '#d9d6dd', '#5d5a77'),
('edee44ac-2dad-4d40-bbea-ea217d12c3aa', 'AIRJORDAN BLUE', 'AIRJORDAN LOW BLUE BLACK', 500, '1', 1, '2025-03-26 23:42:34.707', '#050505', '#1c42b5'),
('f330291b-4ea6-4445-8a06-21a2c6ffb0e9', 'jordan one', 'yellow', 3000, '120249a6-9265-4a75-8257-dd925108d52b', 1, '2025-04-06 18:27:12.363', '#e2c166', '#1a1718'),
('fc4def7d-bb57-4fe4-a775-77f5df770b72', 'safdasdf', 'sdfa', 325, '120249a6-9265-4a75-8257-dd925108d52b', 1, '2025-04-07 17:50:16.600', '#404568', '#d0d1d5');

-- --------------------------------------------------------

--
-- Table structure for table `shoeimage`
--

CREATE TABLE `shoeimage` (
  `id` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL,
  `shoeId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shoeimage`
--

INSERT INTO `shoeimage` (`id`, `url`, `shoeId`) VALUES
('1e3062da-8f47-4323-9ebe-1d065a0ebefb', '/uploads/SHO3.png', 'a63be5ed-b78d-44b8-9260-344f21ec4a2d'),
('2b8ab285-13ab-420e-b253-f512dd372968', '/uploads/SHO6.png', '343d7469-414c-438b-9b3f-a804f23576d9'),
('888d5636-5a99-4833-ada3-09a4d0c675d3', '/uploads/SHO5.png', '3a41ebef-675c-4d9e-a53e-7163c81fb46c'),
('a766f341-b035-41a0-ae5d-53a7cec2a251', '/uploads/sho 1.png', 'fc4def7d-bb57-4fe4-a775-77f5df770b72'),
('adb93568-ce71-4846-8d9d-ed7a3e03827c', '/uploads/sho 1.png', 'edee44ac-2dad-4d40-bbea-ea217d12c3aa'),
('ba1c5ad5-5f52-496e-89a6-10bda44e82ea', '/uploads/SHO4.png', 'adeb5ed4-0372-4b9f-a9d8-baa20346928b'),
('c54c4669-bd24-47b4-9df8-8f1a85924c62', '/uploads/SHO 2.png', '90ac1ef2-1cd5-4584-9931-5f9edd612c71'),
('c5717629-cefa-4fa6-8dc6-e9a21f6b5d0b', '/uploads/SHO6.png', 'a9600e30-aa5c-44e6-b1b5-eb8d06b3c606'),
('c8353e62-7249-4ff4-9090-f4f1d24b7266', '/uploads/SHO3.png', 'f330291b-4ea6-4445-8a06-21a2c6ffb0e9');

-- --------------------------------------------------------

--
-- Table structure for table `shoesize`
--

CREATE TABLE `shoesize` (
  `id` varchar(191) NOT NULL,
  `size` int(11) NOT NULL,
  `shoeId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shoesize`
--

INSERT INTO `shoesize` (`id`, `size`, `shoeId`) VALUES
('0e44ec30-6faf-43b8-abc5-dec04305db4c', 42, 'f330291b-4ea6-4445-8a06-21a2c6ffb0e9'),
('3d499f18-4060-4d69-b986-1aefd24afb47', 44, '343d7469-414c-438b-9b3f-a804f23576d9'),
('42dbc225-11f6-4cfc-890c-9bb4ce876f68', 42, 'fc4def7d-bb57-4fe4-a775-77f5df770b72'),
('569b4cef-d0b2-4e4e-896c-eb4d26d2928e', 44, 'a63be5ed-b78d-44b8-9260-344f21ec4a2d'),
('70c970b5-f94b-4d39-bc1e-077642c8d953', 44, '3a41ebef-675c-4d9e-a53e-7163c81fb46c'),
('b79c2893-439b-472d-80e5-8d068e278b7d', 42, 'edee44ac-2dad-4d40-bbea-ea217d12c3aa'),
('c517b4df-bb37-4f91-931a-34dcd8c8379f', 41, 'adeb5ed4-0372-4b9f-a9d8-baa20346928b'),
('d9c4eacd-f9e8-4284-8368-48bfa867e9a5', 42, 'a9600e30-aa5c-44e6-b1b5-eb8d06b3c606'),
('f5ee9222-4a0e-478d-b75b-3815ae8e7c53', 43, '90ac1ef2-1cd5-4584-9931-5f9edd612c71');

-- --------------------------------------------------------

--
-- Table structure for table `sitesettings`
--

CREATE TABLE `sitesettings` (
  `id` varchar(191) NOT NULL,
  `theme` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sitesettings`
--

INSERT INTO `sitesettings` (`id`, `theme`) VALUES
('5e9c783d-2146-4e51-8081-d0a1d941cf8f', 'light');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('66dba1ad-6a11-4321-8aae-6f15b290620c', '3ed0f68749ef4a7af37d0f11b145290f012f842042c67de80bb323e44ef172a7', '2025-03-26 23:12:14.264', '20250326231214_add_shoe_colors', NULL, NULL, '2025-03-26 23:12:14.257', 1),
('78958308-648e-4092-86e8-51b1c9145eb4', '8ddc2e4fe7c08df32d807c591e4453d0600451a97b591c6e4b5f0ba9d5f40cec', '2025-03-07 14:34:38.447', '20250307143438_update_shoes_images_sizes', NULL, NULL, '2025-03-07 14:34:38.326', 1),
('c714978a-3970-416a-8742-6628c760684a', 'e00d4debdaa71e53cddb70bccb3e468dec4a3466cdcf9a9adc74201af291f146', '2025-03-15 23:55:18.334', '20250315235518_migration_name', NULL, NULL, '2025-03-15 23:55:18.325', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_name_key` (`name`),
  ADD UNIQUE KEY `Category_slug_key` (`slug`);

--
-- Indexes for table `shoe`
--
ALTER TABLE `shoe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Shoe_categoryId_fkey` (`categoryId`);

--
-- Indexes for table `shoeimage`
--
ALTER TABLE `shoeimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ShoeImage_shoeId_fkey` (`shoeId`);

--
-- Indexes for table `shoesize`
--
ALTER TABLE `shoesize`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ShoeSize_shoeId_fkey` (`shoeId`);

--
-- Indexes for table `sitesettings`
--
ALTER TABLE `sitesettings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `shoe`
--
ALTER TABLE `shoe`
  ADD CONSTRAINT `Shoe_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `shoeimage`
--
ALTER TABLE `shoeimage`
  ADD CONSTRAINT `ShoeImage_shoeId_fkey` FOREIGN KEY (`shoeId`) REFERENCES `shoe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shoesize`
--
ALTER TABLE `shoesize`
  ADD CONSTRAINT `ShoeSize_shoeId_fkey` FOREIGN KEY (`shoeId`) REFERENCES `shoe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
