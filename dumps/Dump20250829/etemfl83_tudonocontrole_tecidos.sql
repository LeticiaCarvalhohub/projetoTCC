CREATE DATABASE  IF NOT EXISTS `etemfl83_tudonocontrole` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `etemfl83_tudonocontrole`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: br418.hostgator.com.br    Database: etemfl83_tudonocontrole
-- ------------------------------------------------------
-- Server version	5.7.23-23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tecidos`
--

DROP TABLE IF EXISTS `tecidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tecidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_tecido` varchar(20) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `tipo_tecido` varchar(50) NOT NULL,
  `estampa` varchar(50) DEFAULT NULL,
  `cor` varchar(50) NOT NULL,
  `largura_cm` int(11) NOT NULL,
  `preco_metro` decimal(10,2) NOT NULL,
  `composicao` varchar(100) DEFAULT NULL,
  `peso_g_m2` decimal(6,2) DEFAULT NULL,
  `data_cadastro` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_tecido` (`codigo_tecido`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tecidos`
--

LOCK TABLES `tecidos` WRITE;
/*!40000 ALTER TABLE `tecidos` DISABLE KEYS */;
INSERT INTO `tecidos` VALUES (1,'TEC001','Tricoline Lisa','Círculo','Tricoline','Liso','Azul Claro',150,19.90,'100% Algodão',120.00,'2025-08-19'),(2,'TEC002','Chita Floral','São João','Chita','Floral','Colorido',140,12.50,'100% Algodão',100.00,'2025-08-19'),(3,'TEC003','Oxford Liso','Santista','Oxford','Liso','Preto',150,15.00,'100% Poliéster',180.00,'2025-08-19');
/*!40000 ALTER TABLE `tecidos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-29 14:45:27
