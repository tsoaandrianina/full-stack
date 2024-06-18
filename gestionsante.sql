-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 27, 2023 at 04:50 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestionsante`
--

--
-- Dumping data for table `consultation`
--

INSERT INTO `consultation` (`id_consultation`, `date_consultation`, `maladie`, `resultat`) VALUES
(1, '2023-05-24', 'Appendicite', 'Mal au ventre'),
(2, '2023-05-24', 'Mal aux yeux', 'Miope'),
(3, '2023-05-25', 'Diarhée', 'Mal au ventre');

--
-- Dumping data for table `consultation_ordonnance`
--

INSERT INTO `consultation_ordonnance` (`ordonnance_id`, `consultation_id`) VALUES
(1, 1),
(2, 2),
(3, 3);

--
-- Dumping data for table `ordonnance`
--

INSERT INTO `ordonnance` (`id_ordonnance`, `duree_traitement`, `medicament`, `mode_traitement`, `nombre_medicament`, `observation`) VALUES
(1, '10 jours', 'Malox', '2-0-0', '2 placquets', 'Boire de l\'eau'),
(2, '5 jours', 'Paracetamol', '2-0-0', '2 placquets', 'Boire de l\'eau'),
(3, '10 jours', 'Cotrim', '1-0-0', '2 placquets', 'Boire de l\'eau');

--
-- Dumping data for table `patient_consultation`
--

INSERT INTO `patient_consultation` (`consultation_id`, `user_id`) VALUES
(1, 3),
(2, 4),
(3, 5);

--
-- Dumping data for table `patient_rendezvous`
--

INSERT INTO `patient_rendezvous` (`rendezvous_id`, `user_id`) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5);

--
-- Dumping data for table `rendezvous`
--

INSERT INTO `rendezvous` (`idrendezvous`, `daterendezvous`, `heurerendezvous`, `raison`) VALUES
(1, '2023-05-25', '7h 30mn', 'Consultation'),
(2, '2023-05-26', '10h 30mn', 'Traitement'),
(3, '2023-05-24', '14h 30mn', 'Consultation'),
(4, '2023-05-26', '14h 30mn', 'Consultation');

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_ADMIN');

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `adresse`, `datenaissance`, `email`, `name`, `password`, `sexe`, `tel`, `type`, `username`) VALUES
(1, 'IMITO', '1995-05-06', 'ravakiniainatokyhary@gmail.com', 'RAVAKINIAINA', '$2a$10$YkScS6U9BzL8f0YRo3z5secv1HcxGAYz.fboisxmS.gFaJHDa3NQm', 'Feminin', '0349097811', 'Docteur', 'Mamisoa'),
(2, 'AMBOSITRA', '1998-05-04', 'zoauzii@gmail.com', 'RAKOTONDRASOA', '$2a$10$aFGb5MtD1f55bO0159D0k.oqh6rEoQ.hKCkIXGtXRSElJM020Lylm', 'Masculin', '0349097822', 'Patient', 'Nandrianina'),
(3, 'FANDRIANA', '2000-05-19', 'fanja@gmail.com', 'FANJAMALA', '$2a$10$v.9WMZFSqOoAxsRKh0fGHu1cBwFPx4mQiUD.j75w5YOkq9JoqKGze', 'Feminin', '0349097885', 'Patient', 'Fenosoa'),
(4, 'FANDRIANA', '2021-05-04', 'valisoa@gmail.com', 'FINOANA', '$2a$10$2Lo/lFMK7cGVa47VpMSe0uMea2fpz2zbZh7GOWjwZSeoX1OvNgqG.', 'Masculin', '0321097875', 'Patient', 'Valisoa'),
(5, 'IMITO', '2000-05-12', 'tojo@gmail.com', 'HASIMANJATO', '$2a$10$GnEpuKo/9hdlQVvudccQwuSHjtfMtdUDSU.RfMUOCQuV0lP6rbZv.', 'Masculin', '0349097875', 'Patient', 'Tojoniaina');

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
