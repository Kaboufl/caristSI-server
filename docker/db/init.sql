-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 12 mars 2024 à 13:47
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `esicad-carist-si`
--

-- --------------------------------------------------------

--
-- Structure de la table `carist`
--

DROP TABLE IF EXISTS `carist`;
CREATE TABLE IF NOT EXISTS `carist` (
  `idCarist` int NOT NULL AUTO_INCREMENT,
  `nomCarist` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenomCarist` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idCarist`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `carist`
--

INSERT INTO `carist` (`idCarist`, `nomCarist`, `prenomCarist`, `login`, `password`) VALUES
(1, 'Carist', 'Test', 'carist', '95a335af341b75fccc2c0a61b6ce95c7');

-- --------------------------------------------------------

--
-- Structure de la table `package`
--

DROP TABLE IF EXISTS `package`;
CREATE TABLE IF NOT EXISTS `package` (
  `idPackage` int NOT NULL AUTO_INCREMENT,
  `packageNumber` bigint NOT NULL,
  `articleReference` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idPackage`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `package`
--

INSERT INTO `package` (`idPackage`, `packageNumber`, `articleReference`, `description`) VALUES
(1, 12345456765432, 'REF-BOX-001W', 'RefBox 01 Blanc'),
(2, 12345456765433, 'REF-BOX-001B', 'RefBox 01 Noir');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
