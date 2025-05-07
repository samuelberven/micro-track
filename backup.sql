-- MySQL dump 10.13  Distrib 8.4.5, for Linux (aarch64)
--
-- Host: localhost    Database: gotcha_games
-- ------------------------------------------------------
-- Server version	8.4.5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customers` (
  `customerID` int NOT NULL AUTO_INCREMENT,
  `servicePlatformID` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `servicePlatformID` (`servicePlatformID`),
  CONSTRAINT `Customers_ibfk_1` FOREIGN KEY (`servicePlatformID`) REFERENCES `ServicePlatforms` (`servicePlatformID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,1,'john2k','johnnytwokay@gmail.com'),(2,1,'jacobs2k','jakejake@hotmail.com'),(3,2,'jingleheimer2k','jingles@gmail.com'),(4,2,'schmidt2k','schmiddybear1990@yahoo.com'),(6,1,'YB','yb@fake.com');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CustomersHaveGames`
--

DROP TABLE IF EXISTS `CustomersHaveGames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CustomersHaveGames` (
  `customersHaveGamesID` int NOT NULL AUTO_INCREMENT,
  `customerID` int NOT NULL,
  `gameID` int NOT NULL,
  `installDate` date DEFAULT NULL,
  PRIMARY KEY (`customersHaveGamesID`),
  KEY `customerID` (`customerID`),
  KEY `gameID` (`gameID`),
  CONSTRAINT `CustomersHaveGames_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE CASCADE,
  CONSTRAINT `CustomersHaveGames_ibfk_2` FOREIGN KEY (`gameID`) REFERENCES `Games` (`gameID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CustomersHaveGames`
--

LOCK TABLES `CustomersHaveGames` WRITE;
/*!40000 ALTER TABLE `CustomersHaveGames` DISABLE KEYS */;
INSERT INTO `CustomersHaveGames` VALUES (1,1,1,'2019-07-12'),(2,1,2,'2020-01-14'),(3,2,2,'2020-01-14'),(4,3,2,'2020-01-14'),(5,1,3,'2021-02-02'),(6,3,3,'2021-02-02'),(7,4,4,'2021-11-29'),(8,1,4,'2021-11-29');
/*!40000 ALTER TABLE `CustomersHaveGames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Developers`
--

DROP TABLE IF EXISTS `Developers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Developers` (
  `developerID` int NOT NULL AUTO_INCREMENT,
  `developerName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zipCode` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  PRIMARY KEY (`developerID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Developers`
--

LOCK TABLES `Developers` WRITE;
/*!40000 ALTER TABLE `Developers` DISABLE KEYS */;
INSERT INTO `Developers` VALUES (1,'Seintendo','1234 Example Ave.','Mario','CA',34410,'questions@seintendo.com','Daniel Danielson'),(2,'Seinga','45678 Nonexistent Drive','Sonic','GA',50912,'requests@seinga.com','Anders Anderson'),(3,'UbiSein','1458 France Way','Rayman','MN',64349,'conundrums@ubisein.com','Robert Robertson'),(4,'MicroSein','400 Broad Street','Doomguy','TX',60036,'queries@microsein.com','John Johnson'),(6,'Test Developer2','123 Main St','Anytown','AA',12345,'dev@test.com','555-1234'),(8,'Pero Corporation','123','Seattle','WA',98225,'pero@muni.com','Hato-chan');
/*!40000 ALTER TABLE `Developers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Games`
--

DROP TABLE IF EXISTS `Games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Games` (
  `gameID` int NOT NULL AUTO_INCREMENT,
  `developerID` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `releaseDate` date NOT NULL,
  PRIMARY KEY (`gameID`),
  KEY `developerID` (`developerID`),
  CONSTRAINT `Games_ibfk_1` FOREIGN KEY (`developerID`) REFERENCES `Developers` (`developerID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Games`
--

LOCK TABLES `Games` WRITE;
/*!40000 ALTER TABLE `Games` DISABLE KEYS */;
INSERT INTO `Games` VALUES (1,1,'Puddle Splasher 2K','Realistic puddle splash simulator','2019-07-12'),(2,2,'Rocks and Branches','Battle royale title in an outdoor setting','2020-01-14'),(3,3,'The Hokey Pokey','Stirring and shocking visual novel','2021-02-02'),(4,4,'Who Let The Dogs Out','Atmospheric and interactive detective tale','2021-11-29'),(6,1,'Puddle Splasher 2: 2 Much Puddle 4 U','Just what the title says.','2025-04-28'),(7,1,'Puddle Splasher 3: The Soakey Pokey','Dance title crossover with UbiSein','2025-04-28'),(9,8,'Honey Honey Battle','Fighting for the last bit of honey','2025-04-30');
/*!40000 ALTER TABLE `Games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Microtransactions`
--

DROP TABLE IF EXISTS `Microtransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Microtransactions` (
  `microtransactionID` int NOT NULL AUTO_INCREMENT,
  `gameID` int NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`microtransactionID`),
  KEY `gameID` (`gameID`),
  CONSTRAINT `Microtransactions_ibfk_1` FOREIGN KEY (`gameID`) REFERENCES `Games` (`gameID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Microtransactions`
--

LOCK TABLES `Microtransactions` WRITE;
/*!40000 ALTER TABLE `Microtransactions` DISABLE KEYS */;
INSERT INTO `Microtransactions` VALUES (1,1,0.99,'100 diamonds'),(2,1,9.99,'1500 diamonds'),(3,1,99.99,'20000 diamonds'),(4,2,2.99,'Hero skin - Gold Knight'),(5,2,2.99,'Hero skin - Skull Mage'),(6,2,2.99,'Hero skin - Spec OPS'),(7,3,9.99,'No ads'),(8,4,4.99,'777 diamonds'),(9,4,47.99,'7777 diamonds'),(11,9,9.99,'Free honey for a month');
/*!40000 ALTER TABLE `Microtransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Purchases`
--

DROP TABLE IF EXISTS `Purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Purchases` (
  `purchaseID` int NOT NULL AUTO_INCREMENT,
  `customerID` int DEFAULT NULL,
  `microtransactionID` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`purchaseID`),
  KEY `customerID` (`customerID`),
  KEY `microtransactionID` (`microtransactionID`),
  CONSTRAINT `Purchases_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE SET NULL,
  CONSTRAINT `Purchases_ibfk_2` FOREIGN KEY (`microtransactionID`) REFERENCES `Microtransactions` (`microtransactionID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Purchases`
--

LOCK TABLES `Purchases` WRITE;
/*!40000 ALTER TABLE `Purchases` DISABLE KEYS */;
INSERT INTO `Purchases` VALUES (1,1,2,'2019-08-11'),(2,1,3,'2019-10-30'),(3,1,3,'2019-10-30'),(4,2,5,'2020-03-01'),(5,3,6,'2020-04-12'),(6,4,7,'2021-02-05'),(7,1,9,'2021-12-06'),(10,3,4,'2025-04-18'),(11,3,9,'2025-04-03'),(12,3,4,'2025-04-03'),(13,2,1,'2011-01-01'),(14,2,2,'2025-04-23'),(15,3,7,'2025-04-30'),(16,2,4,'2015-01-05'),(17,3,3,'2025-04-09'),(18,6,11,'2025-04-01');
/*!40000 ALTER TABLE `Purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServicePlatforms`
--

DROP TABLE IF EXISTS `ServicePlatforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServicePlatforms` (
  `servicePlatformID` int NOT NULL AUTO_INCREMENT,
  `platformName` varchar(45) NOT NULL,
  PRIMARY KEY (`servicePlatformID`),
  UNIQUE KEY `platformName` (`platformName`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServicePlatforms`
--

LOCK TABLES `ServicePlatforms` WRITE;
/*!40000 ALTER TABLE `ServicePlatforms` DISABLE KEYS */;
INSERT INTO `ServicePlatforms` VALUES (1,'Apple'),(2,'Google'),(4,'New one');
/*!40000 ALTER TABLE `ServicePlatforms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-05  7:40:32
