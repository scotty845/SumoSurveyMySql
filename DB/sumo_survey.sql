CREATE DATABASE  IF NOT EXISTS `sumo_survey` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sumo_survey`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: sumo_survey
-- ------------------------------------------------------
-- Server version	5.7.9-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answerText` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `QuestionId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `QuestionId` (`QuestionId`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`QuestionId`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=646 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (597,'Grilled Steak','2016-04-05 11:19:03','2016-04-05 11:19:39',282),(598,'Grilled Chicken','2016-04-05 11:19:09','2016-04-05 11:19:45',282),(599,'Fish','2016-04-05 11:19:16','2016-04-05 11:19:16',282),(600,'Ground Beef','2016-04-05 11:19:32','2016-04-05 11:19:32',282),(601,'Grilled Shrimp','2016-04-05 11:20:00','2016-04-05 12:00:53',282),(602,'Bacon','2016-04-05 11:21:06','2016-04-05 11:21:06',283),(603,'Onions','2016-04-05 11:21:17','2016-04-05 11:21:17',283),(604,'Mushrooms','2016-04-05 11:21:24','2016-04-05 11:21:24',283),(605,'Cheddar Cheese','2016-04-05 11:22:06','2016-04-05 11:22:06',283),(606,'Philly Cheesesteak','2016-04-05 11:23:16','2016-04-05 11:23:16',284),(607,'Turkey Club','2016-04-05 11:23:28','2016-04-05 11:23:28',284),(608,'Italian Hoagie','2016-04-05 11:23:39','2016-04-05 11:23:39',284),(609,'Panini','2016-04-05 11:24:08','2016-04-05 11:24:08',284),(610,'Gyro','2016-04-05 11:24:17','2016-04-05 11:24:17',284),(611,'Lasagna','2016-04-05 11:25:22','2016-04-05 11:25:22',285),(612,'Veil Picata','2016-04-05 11:25:31','2016-04-05 11:25:31',285),(613,'Fetachini Alfredo','2016-04-05 11:25:41','2016-04-05 11:25:41',285),(614,'Spagetti and Meatballs','2016-04-05 11:26:16','2016-04-05 11:26:16',285),(615,'Tacos','2016-04-05 11:29:05','2016-04-05 11:29:05',286),(616,'Fajitas','2016-04-05 11:29:38','2016-04-05 11:29:38',286),(617,'Flautas','2016-04-05 11:30:52','2016-04-05 11:30:52',286),(618,'Burrito','2016-04-05 11:31:09','2016-04-05 11:31:09',286),(619,'Enchilada','2016-04-05 11:31:29','2016-04-05 11:31:29',286),(620,'Quesadillas','2016-04-05 11:31:48','2016-04-05 11:31:48',286),(621,'Tamales','2016-04-05 11:32:14','2016-04-05 11:32:14',286),(622,'Fried Rice','2016-04-05 11:34:55','2016-04-05 11:34:55',287),(623,'Egg Roll','2016-04-05 11:35:01','2016-04-05 11:35:01',287),(624,'General Tso\'s chicken','2016-04-05 11:35:29','2016-04-05 11:35:29',287),(625,'Wanton Soup','2016-04-05 11:35:49','2016-04-05 11:35:49',287),(626,'Gong Bao Chicken','2016-04-05 11:36:31','2016-04-05 11:36:31',287),(627,'Peking Roasted Duck','2016-04-05 11:37:01','2016-04-05 11:37:01',287),(628,'Dumplings','2016-04-05 11:37:25','2016-04-05 11:37:25',287),(629,'Chicken Parmesan','2016-04-05 11:39:19','2016-04-05 11:39:19',285),(630,'Roast Beef Sub','2016-04-05 11:41:08','2016-04-05 11:41:08',284),(631,'Avocado','2016-04-05 11:41:51','2016-04-05 11:41:56',283),(632,'Star Wars The Empire Strikes Back','2016-04-05 12:16:22','2016-04-05 12:16:22',288),(633,'The Matrix','2016-04-05 12:16:40','2016-04-05 12:23:31',288),(634,'Star Trek II: The Wrath of Khan','2016-04-05 12:18:02','2016-04-05 12:18:02',288),(635,'Blade Runner','2016-04-05 12:18:50','2016-04-05 12:18:50',288),(636,'2001: A Space Odyssey','2016-04-05 12:23:24','2016-04-05 12:23:24',288),(637,'Terminator Salvation','2016-04-05 12:24:44','2016-04-05 12:24:44',288),(638,'Aikido','2016-04-05 12:26:06','2016-04-05 12:26:06',289),(639,'Karate','2016-04-05 12:26:11','2016-04-05 12:26:11',289),(640,'jiu jitsu','2016-04-05 12:26:31','2016-04-05 12:26:31',289),(641,'ninjutsu','2016-04-05 12:26:58','2016-04-05 12:26:58',289),(642,'Jeet Kune Do','2016-04-05 12:27:19','2016-04-05 12:27:19',289),(643,'Wing Chun','2016-04-05 12:27:45','2016-04-05 12:27:45',289),(644,'Mixed Martial Arts','2016-04-05 12:27:57','2016-04-05 12:27:57',289),(645,'Kenjutsu','2016-04-05 12:28:29','2016-04-05 12:28:29',289);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionText` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=290 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (282,'What is your favorite taco?','2016-04-05 11:18:52','2016-04-05 11:18:52'),(283,'What is your favorite burger topping?','2016-04-05 11:20:58','2016-04-05 11:20:58'),(284,'What is your favorite sandwich?','2016-04-05 11:23:05','2016-04-05 11:23:05'),(285,'What is your favorite Italian Dish','2016-04-05 11:24:51','2016-04-05 11:42:30'),(286,'What is your favorite Mexican Dish?','2016-04-05 11:28:56','2016-04-05 11:28:56'),(287,'What is your favorite Chinese Dish?','2016-04-05 11:34:47','2016-04-05 11:34:47'),(288,'What is your favorite sci fi movie?','2016-04-05 12:15:54','2016-04-05 12:15:54'),(289,'What is your favorite Martial Art?','2016-04-05 12:25:59','2016-04-05 12:25:59');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveyanswers`
--

DROP TABLE IF EXISTS `surveyanswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `surveyanswers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guestIP` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `AnswerId` int(11) DEFAULT NULL,
  `QuestionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `AnswerId` (`AnswerId`),
  KEY `QuestionId` (`QuestionId`),
  CONSTRAINT `surveyanswers_ibfk_1` FOREIGN KEY (`AnswerId`) REFERENCES `answers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `surveyanswers_ibfk_2` FOREIGN KEY (`QuestionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveyanswers`
--

LOCK TABLES `surveyanswers` WRITE;
/*!40000 ALTER TABLE `surveyanswers` DISABLE KEYS */;
INSERT INTO `surveyanswers` VALUES (113,'::100','2016-04-05 11:20:00','2016-04-05 11:20:00',602,283),(114,'::101','2016-04-05 11:20:00','2016-04-05 11:20:00',602,283),(115,'::102','2016-04-05 11:20:00','2016-04-05 11:20:00',602,283),(116,'::103','2016-04-05 11:20:00','2016-04-05 11:20:00',605,283),(117,'::104','2016-04-05 11:20:00','2016-04-05 11:20:00',605,283),(118,'::105','2016-04-05 11:20:00','2016-04-05 11:20:00',603,283),(119,'::100','2016-04-05 11:20:00','2016-04-05 11:20:00',597,282),(120,'::101','2016-04-05 11:20:00','2016-04-05 11:20:00',597,282),(121,'::102','2016-04-05 11:20:00','2016-04-05 11:20:00',599,282),(122,'::103','2016-04-05 11:20:00','2016-04-05 11:20:00',600,282),(123,'::104','2016-04-05 11:20:00','2016-04-05 11:20:00',601,282),(124,'::105','2016-04-05 11:20:00','2016-04-05 11:20:00',598,282),(125,'::100','2016-04-05 11:20:00','2016-04-05 11:20:00',615,286),(126,'::101','2016-04-05 11:20:00','2016-04-05 11:20:00',616,286),(127,'::102','2016-04-05 11:20:00','2016-04-05 11:20:00',617,286),(128,'::103','2016-04-05 11:20:00','2016-04-05 11:20:00',618,286),(129,'::104','2016-04-05 11:20:00','2016-04-05 11:20:00',619,286),(130,'::105','2016-04-05 11:20:00','2016-04-05 11:20:00',618,286);
/*!40000 ALTER TABLE `surveyanswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveyusers`
--

DROP TABLE IF EXISTS `surveyusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `surveyusers` (
  `id` int(11) NOT NULL,
  `uname` varchar(45) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `surveyuserId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveyusers`
--

LOCK TABLES `surveyusers` WRITE;
/*!40000 ALTER TABLE `surveyusers` DISABLE KEYS */;
INSERT INTO `surveyusers` VALUES (2,'hhanzo','ninja','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),(3,'mmusashi','sword','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL);
/*!40000 ALTER TABLE `surveyusers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-05  8:44:08
