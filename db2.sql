CREATE DATABASE  IF NOT EXISTS `bankappdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bankappdb`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: bankappdb
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `bank_account`
--

DROP TABLE IF EXISTS `bank_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `balance` double NOT NULL,
  `bank_code` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK92iik4jwhk7q385jubl2bc2mm` (`user_id`),
  CONSTRAINT `FK92iik4jwhk7q385jubl2bc2mm` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_account`
--

LOCK TABLES `bank_account` WRITE;
/*!40000 ALTER TABLE `bank_account` DISABLE KEYS */;
INSERT INTO `bank_account` VALUES (1,'988000600100047896',8360,'PUNB0099888','Punjab National Bank',4),(2,'6778868936890000023',11500,'SBIN09880','State Bank Of India',4),(3,'20039969988000076',0,'HDFC089970','HDFC',5),(53,'ACC017',1000,'SBI001','State Bank of India',17),(54,'ACC018',1500,'HDFC001','HDFC Bank',18),(55,'ACC019',2000,'ICICI001','ICICI Bank',19),(56,'ACC020',1300,'AXIS001','Axis Bank',20),(57,'ACC021',1800,'SBI001','State Bank of India',21),(58,'ACC022',2250,'HDFC001','HDFC Bank',22),(59,'ACC023',1368,'ICICI001','ICICI Bank',23),(60,'ACC024',2250,'AXIS001','Axis Bank',24),(61,'ACC025',1280,'SBI001','State Bank of India',25),(62,'ACC026',1900,'HDFC001','HDFC Bank',26),(63,'ACC027A',2500,'SBI001','State Bank of India',27),(64,'ACC027B',3000,'HDFC001','HDFC Bank',27),(65,'ACC028A',1400,'ICICI001','ICICI Bank',28),(66,'ACC028B',1600,'AXIS001','Axis Bank',28),(67,'ACC029A',2100,'SBI001','State Bank of India',29),(68,'ACC029B',2300,'HDFC001','HDFC Bank',29),(69,'ACC030A',2700,'ICICI001','ICICI Bank',30),(70,'ACC030B',2900,'AXIS001','Axis Bank',30),(71,'ACC031A',3100,'SBI001','State Bank of India',31),(72,'ACC031B',3300,'HDFC001','HDFC Bank',31),(73,'ACC032A',3500,'ICICI001','ICICI Bank',32),(74,'ACC032B',3700,'AXIS001','Axis Bank',32),(75,'ACC033A',3900,'SBI001','State Bank of India',33),(76,'ACC033B',4100,'HDFC001','HDFC Bank',33),(77,'ACC034A',4300,'ICICI001','ICICI Bank',34),(78,'ACC034B',4500,'AXIS001','Axis Bank',34),(79,'ACC035A',4700,'SBI001','State Bank of India',35),(80,'ACC035B',4900,'HDFC001','HDFC Bank',35),(81,'ACC036A',5100,'ICICI001','ICICI Bank',36),(82,'ACC036B',5300,'AXIS001','Axis Bank',36),(83,'ACC037A',5500,'SBI001','State Bank of India',37),(84,'ACC037B',5700,'HDFC001','HDFC Bank',37),(85,'ACC037C',5900,'ICICI001','ICICI Bank',37),(86,'ACC038A',6100,'AXIS001','Axis Bank',38),(87,'ACC038B',6300,'SBI001','State Bank of India',38),(88,'ACC038C',6500,'HDFC001','HDFC Bank',38),(89,'ACC039A',6700,'ICICI001','ICICI Bank',39),(90,'ACC039B',6900,'AXIS001','Axis Bank',39),(91,'ACC039C',7100,'SBI001','State Bank of India',39),(92,'ACC040A',7300,'HDFC001','HDFC Bank',40),(93,'ACC040B',7500,'ICICI001','ICICI Bank',40),(94,'ACC040C',7700,'AXIS001','Axis Bank',40),(95,'ACC041A',7900,'SBI001','State Bank of India',41),(96,'ACC041B',8100,'HDFC001','HDFC Bank',41),(97,'ACC041C',8350,'ICICI001','ICICI Bank',41),(98,'0411101088001',40,'26781542376','Canara Bank',45),(100,'65433566',0,'Ddcg','Rfgg',50),(102,'5876738393',3014.5191754754023,'Hhdjdb','Hdksj',48),(103,'68538939',2664.8843828338436,'Fidhj','Ghkk',51),(104,'7756379',9652.975440747192,'Hdji','Yhjsk',51),(105,'68664699008',1604.0273150674707,'Gdvv','Hjfgb',54),(106,'783683920',221.8271631773705,'Kndbdn','Hhdbnd',55),(107,'683683993',9192.151760975019,'Jjjd','Hsjnd',55),(108,'98902783',5948.0412843775375,'Hsins','Uudj',48),(109,'4679990',9619.747259606736,'Hgjk','Acchjmm',56),(110,'45895488',5734.8763544956555,'Iijll','Hgvhj',56),(111,'69399302',4060.080318414288,'Isjks','Hdvksk',58),(112,'662527992',5779.872093245569,'Kakis','Jbxkdks',58),(113,'5794690032',3599.6168024270796,'Gdvk','Hdvjm',59),(114,'4693790082',7572.726217062936,'Fsgkl','Ghjkl',59),(115,'257896321',704.2914872464269,'Hrgjk','Gcjj',55),(116,'5349469494',4095.236449459024,'Gsjns','Uehsk',57),(117,'89647358976',2869.3816717227546,'Canara000025','Canara',53),(118,'546849354849',8252.76271203269,'HDFC0000020','HDFC',53),(119,'123546789',2169.5311531712287,'SBI','State Bank',60),(120,'12354678880',3337.7975673141427,'UBI','Union Bank',60),(121,'6879548469',3122.840193624718,'Canara004','Canara bank',61),(122,'1234',6862.628313387293,'23','Icici',62),(123,'4321',7532.22049261461,'557','Rbi',62),(124,'8999787899856',4925.213167425678,'Icici1004','ICICI',61);
/*!40000 ALTER TABLE `bank_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing`
--

DROP TABLE IF EXISTS `billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `transaction_id` bigint NOT NULL,
  `billing_type` varchar(255) NOT NULL,
  `customer_id` varchar(255) DEFAULT NULL,
  `property_name` varchar(255) DEFAULT NULL,
  `rr_number` varchar(255) DEFAULT NULL,
  `amount` double NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `transaction_id` (`transaction_id`),
  CONSTRAINT `billing_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction_history` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing`
--

LOCK TABLES `billing` WRITE;
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
INSERT INTO `billing` VALUES (1,18,'RENT',NULL,'Ramesh',NULL,5000,'2025-04-20 04:21:47'),(2,19,'ELECTRICITY','Hjdjdkm',NULL,NULL,200,'2025-04-20 04:22:39'),(3,20,'WATER',NULL,NULL,'Rshdjkf',200,'2025-04-20 04:22:52'),(4,23,'ELECTRICITY','Gfjmnv',NULL,NULL,200,'2025-04-20 08:51:35'),(5,24,'ELECTRICITY','Hhyjl',NULL,NULL,500,'2025-04-20 13:23:28'),(6,26,'ELECTRICITY','Fhkmb',NULL,NULL,100,'2025-04-20 20:31:22'),(7,34,'WATER',NULL,NULL,'Qttw',2000,'2025-04-21 05:04:37');
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `username` varchar(255) NOT NULL,
  `feedback_text` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,1,'shiva','Great app!','2025-04-17 10:47:50'),(2,48,'testuser','Test feedback','2025-04-18 08:31:54'),(3,4,'Shashank','Hlo','2025-04-18 11:10:59'),(4,54,'Vijay','Noice application','2025-04-18 16:25:07'),(5,55,'Sumukh','Bank app working good','2025-04-19 07:40:06'),(6,55,'Sumukh','Hlo','2025-04-19 11:38:43'),(7,55,'Sumukh','Superrr','2025-04-19 15:12:58'),(8,48,'Sdk','Hlo','2025-04-20 05:26:37'),(9,59,'Samay','Nice app','2025-04-20 08:52:44'),(10,53,'vikas','Wonderful \n','2025-04-20 13:35:26'),(11,59,'Samay','Goodnight','2025-04-20 21:46:50'),(12,60,'Ramesh','Good app\n','2025-04-21 05:07:49');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `interest_rate` double NOT NULL,
  `term_in_months` int NOT NULL,
  `terms` varchar(255) DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `loan_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1f31wjhf4fgepbes93tej8igp` (`account_id`),
  KEY `FKxxm1yc1xty3qn1pthgj8ac4f` (`user_id`),
  CONSTRAINT `FK1f31wjhf4fgepbes93tej8igp` FOREIGN KEY (`account_id`) REFERENCES `bank_account` (`id`),
  CONSTRAINT `FKxxm1yc1xty3qn1pthgj8ac4f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (1,20000,7,24,'Max ₹100,000 | 7% interest | 2-year term',1,NULL,NULL),(2,20000,7,24,'Max ₹100,000 | 7% interest | 2-year term',2,NULL,NULL),(4,50000,7,24,'Max ₹100,000 | 7% interest | 2-year term',105,NULL,'home'),(5,50000,8,12,'Max ₹150,000 | 8% interest | 1-year term',110,NULL,'medical'),(6,50000,7,24,'Max ₹100,000 | 7% interest | 2-year term',109,NULL,'personal'),(7,20000,6,60,'Max ₹200,000 | 6% interest | 5-year term',117,NULL,'education'),(8,200000,7.5,36,'Max ₹300,000 | 7.5% interest | 3-year term',114,NULL,'vehicle'),(9,55050,7,24,'Max ₹100,000 | 7% interest | 2-year term',119,NULL,'personal'),(10,50000,7,24,'Max ₹100,000 | 7% interest | 2-year term',121,NULL,'personal');
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `rating` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `ratings_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,55,3,'2025-04-20 04:39:31'),(2,55,5,'2025-04-20 05:28:28'),(3,59,4,'2025-04-20 08:52:49'),(4,59,4,'2025-04-20 11:42:25'),(5,53,4,'2025-04-20 13:39:03'),(6,53,4,'2025-04-20 13:41:05'),(7,53,4,'2025-04-20 13:43:06'),(8,53,5,'2025-04-20 13:43:09'),(9,59,4,'2025-04-20 21:46:54'),(10,60,4,'2025-04-21 05:07:54');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receive_requests`
--

DROP TABLE IF EXISTS `receive_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receive_requests` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `amount` double NOT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `receive_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receive_requests`
--

LOCK TABLES `receive_requests` WRITE;
/*!40000 ALTER TABLE `receive_requests` DISABLE KEYS */;
INSERT INTO `receive_requests` VALUES (1,55,'783683920',50,'RECEIVE:783683920:50.0','PENDING','2025-04-20 05:20:13'),(2,59,'5794690032',500,'RECEIVE:5794690032:500.0','PENDING','2025-04-20 08:51:58'),(3,60,'12354678880',500,'RECEIVE:12354678880:500.0','PENDING','2025-04-21 05:06:27'),(4,60,'12354678880',1,'RECEIVE:12354678880:1.0','PENDING','2025-04-21 05:07:17'),(5,60,'12354678880',1,'RECEIVE:12354678880:1.0','PENDING','2025-04-21 05:07:26'),(6,61,'6879548469',600,'RECEIVE:6879548469:600.0','PENDING','2025-04-22 18:43:52');
/*!40000 ALTER TABLE `receive_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_history`
--

DROP TABLE IF EXISTS `transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `transaction_type` varchar(255) NOT NULL,
  `from_account_id` bigint DEFAULT NULL,
  `to_account_id` bigint DEFAULT NULL,
  `amount` double NOT NULL,
  `upi_id` varchar(255) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'COMPLETED',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `from_account_id` (`from_account_id`),
  KEY `to_account_id` (`to_account_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `transaction_history_ibfk_1` FOREIGN KEY (`from_account_id`) REFERENCES `bank_account` (`id`),
  CONSTRAINT `transaction_history_ibfk_2` FOREIGN KEY (`to_account_id`) REFERENCES `bank_account` (`id`),
  CONSTRAINT `transaction_history_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_history`
--

LOCK TABLES `transaction_history` WRITE;
/*!40000 ALTER TABLE `transaction_history` DISABLE KEYS */;
INSERT INTO `transaction_history` VALUES (1,'TRANSFER_TO_OTHERS',1,2,500,NULL,'COMPLETED','2025-04-17 10:49:50',4),(2,'TRANSFER_TO_OTHERS',1,2,500,NULL,'COMPLETED','2025-04-17 11:00:05',4),(3,'TRANSFER_TO_OTHERS',1,2,500,NULL,'COMPLETED','2025-04-17 11:11:24',4),(4,'TRANSFER_TO_OTHERS',2,1,500,NULL,'COMPLETED','2025-04-17 11:17:43',4),(5,'TRANSFER_TO_OTHERS',2,1,500,NULL,'COMPLETED','2025-04-17 11:22:42',4),(6,'TRANSFER_TO_OTHERS',1,2,500,NULL,'COMPLETED','2025-04-17 15:58:16',4),(7,'TEST_TRANSFER',1,2,100,NULL,'COMPLETED','2025-04-19 11:42:24',55),(8,'SELF_TRANSFER',106,107,50,NULL,'COMPLETED','2025-04-19 12:01:39',55),(9,'SELF_TRANSFER',106,107,10,NULL,'COMPLETED','2025-04-19 12:22:01',55),(10,'SELF_TRANSFER',106,107,20,NULL,'COMPLETED','2025-04-19 12:25:25',55),(11,'SELF_TRANSFER',102,108,20,NULL,'COMPLETED','2025-04-19 12:29:57',48),(12,'TRANSFER_TO_OTHERS',106,61,5,NULL,'COMPLETED','2025-04-19 15:55:47',55),(13,'TRANSFER_TO_OTHERS',106,61,50,NULL,'COMPLETED','2025-04-19 15:55:47',55),(14,'SELF_TRANSFER',107,106,50,NULL,'COMPLETED','2025-04-19 16:17:24',55),(15,'TRANSFER_TO_OTHERS',106,61,50,NULL,'COMPLETED','2025-04-19 16:17:48',55),(16,'SELF_TRANSFER',109,110,100,NULL,'COMPLETED','2025-04-19 18:51:58',56),(17,'TRANSFER_TO_OTHERS',109,60,50,NULL,'COMPLETED','2025-04-19 18:52:22',56),(18,'BILL_PAYMENT',106,NULL,5000,NULL,'COMPLETED','2025-04-20 04:21:48',55),(19,'BILL_PAYMENT',106,NULL,200,NULL,'COMPLETED','2025-04-20 04:22:40',55),(20,'BILL_PAYMENT',106,NULL,200,NULL,'COMPLETED','2025-04-20 04:22:52',55),(21,'SELF_TRANSFER',113,114,50,NULL,'COMPLETED','2025-04-20 08:50:38',59),(22,'TRANSFER_TO_OTHERS',114,60,500,NULL,'COMPLETED','2025-04-20 08:51:01',59),(23,'BILL_PAYMENT',113,NULL,200,NULL,'COMPLETED','2025-04-20 08:51:36',59),(24,'BILL_PAYMENT',117,NULL,500,NULL,'COMPLETED','2025-04-20 13:23:29',53),(25,'TRANSFER_TO_OTHERS',117,59,68,NULL,'COMPLETED','2025-04-20 13:24:51',53),(26,'BILL_PAYMENT',106,NULL,100,NULL,'COMPLETED','2025-04-20 20:31:22',55),(27,'SELF_TRANSFER',106,115,100,NULL,'COMPLETED','2025-04-20 20:31:46',55),(28,'TRANSFER_TO_OTHERS',107,58,50,NULL,'COMPLETED','2025-04-20 20:32:13',55),(29,'SELF_TRANSFER',113,114,25,NULL,'COMPLETED','2025-04-20 21:01:54',59),(30,'UPI',113,NULL,25,'Samay@upi','COMPLETED','2025-04-20 21:02:16',59),(31,'SELF_TRANSFER',113,114,15,NULL,'COMPLETED','2025-04-20 21:46:09',59),(32,'SELF_TRANSFER',119,120,500,NULL,'COMPLETED','2025-04-21 05:00:20',60),(33,'SELF_TRANSFER',119,120,100,NULL,'COMPLETED','2025-04-21 05:01:13',60),(34,'BILL_PAYMENT',119,NULL,2000,NULL,'COMPLETED','2025-04-21 05:04:37',60),(35,'SELF_TRANSFER',119,120,25,NULL,'COMPLETED','2025-04-21 07:51:12',60),(36,'TRANSFER_TO_OTHERS',119,121,100,NULL,'COMPLETED','2025-04-21 07:57:13',60),(37,'TRANSFER_TO_OTHERS',121,120,100,NULL,'COMPLETED','2025-04-21 07:58:14',61),(38,'SELF_TRANSFER',122,123,75,NULL,'COMPLETED','2025-04-22 11:03:54',62),(39,'SELF_TRANSFER',121,124,50,NULL,'COMPLETED','2025-04-22 18:40:40',61),(40,'TRANSFER_TO_OTHERS',121,109,500,NULL,'COMPLETED','2025-04-22 18:41:53',61);
/*!40000 ALTER TABLE `transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'sanjay@example.com','Sanjay','mypassword',NULL,NULL,NULL),(2,'sanjay@example.com','Sanjay','mypassword',NULL,NULL,NULL),(3,'sanjay12@gmail.com','Sanju','123456',NULL,NULL,NULL),(4,'sk@gmail.com','Shashank','Shashank',NULL,NULL,NULL),(5,'sai@gmail.com','Sai','Sai',NULL,NULL,NULL),(6,'saiganesh@gmail.com','Saiganesh','Sai25',NULL,NULL,NULL),(7,'V@gmail.com','Vidhan','Vidhan',NULL,NULL,NULL),(8,'Vig@gmail.com','Vignesh ','V123',NULL,NULL,NULL),(9,'sanath@gmail.com','Sanath','Sanath',NULL,NULL,NULL),(10,'Manish@gmail.com','Manish','12345',NULL,NULL,NULL),(11,'Somesh@gmail.com','Somesh','Somesh',NULL,NULL,NULL),(12,'Sannu@gmail.com','Sannidhi ','Sannu',NULL,NULL,NULL),(17,'arjun.sharma@gmail.com','Arjun Sharma','Arjun@123',NULL,NULL,NULL),(18,'priya.singh@gmail.com','Priya Singh','Priya#456',NULL,NULL,NULL),(19,'rahul.verma@gmail.com','Rahul Verma','Rahul789',NULL,NULL,NULL),(20,'ananya.patel@gmail.com','Ananya Patel','Ananya$101',NULL,NULL,NULL),(21,'vikram.mehta@gmail.com','Vikram Mehta','Vikram202',NULL,NULL,NULL),(22,'neha.kumar@gmail.com','Neha Kumar','Neha!303',NULL,NULL,NULL),(23,'siddharth.jain@gmail.com','Siddharth Jain','Sidd@404',NULL,NULL,NULL),(24,'kavya.reddy@gmail.com','Kavya Reddy','Kavya#505',NULL,NULL,NULL),(25,'rohan.desai@gmail.com','Rohan Desai','Rohan606',NULL,NULL,NULL),(26,'isha.gupta@gmail.com','Isha Gupta','Isha@707',NULL,NULL,NULL),(27,'aditya.nair@gmail.com','Aditya Nair','Aditya808',NULL,NULL,NULL),(28,'meera.rao@gmail.com','Meera Rao','Meera!909',NULL,NULL,NULL),(29,'sameer.khan@gmail.com','Sameer Khan','Sameer1010',NULL,NULL,NULL),(30,'tanvi.mishra@gmail.com','Tanvi Mishra','Tanvi@1111',NULL,NULL,NULL),(31,'yash.aggarwal@gmail.com','Yash Aggarwal','Yash1212',NULL,NULL,NULL),(32,'divya.soni@gmail.com','Divya Soni','Divya@1313',NULL,NULL,NULL),(33,'karan.thakur@gmail.com','Karan Thakur','Karan1414',NULL,NULL,NULL),(34,'pooja.das@gmail.com','Pooja Das','Pooja!1515',NULL,NULL,NULL),(35,'nitin.bose@gmail.com','Nitin Bose','Nitin1616',NULL,NULL,NULL),(36,'rhea.chopra@gmail.com','Rhea Chopra','Rhea@1717',NULL,NULL,NULL),(37,'amit.sethi@gmail.com','Amit Sethi','Amit1818',NULL,NULL,NULL),(38,'sneha.menon@gmail.com','Sneha Menon','Sneha!1919',NULL,NULL,NULL),(39,'vivek.dubey@gmail.com','Vivek Dubey','Vivek2020',NULL,NULL,NULL),(40,'lakshmi.nair@gmail.com','Lakshmi Nair','Lakshmi@2121',NULL,NULL,NULL),(41,'omkar.pawar@gmail.com','Omkar Pawar','Omkar2222',NULL,NULL,NULL),(42,'','','',NULL,NULL,NULL),(43,'Mourya@gmail.com',' Mourya','12345',NULL,NULL,NULL),(44,'Vidhaan@gmail.com','Vidhaan','Vidhaan',NULL,NULL,NULL),(45,'Patil@gmail.com','Patil','Loverboi',NULL,NULL,NULL),(46,'ram@gmail.com','Ram','sitha123',NULL,NULL,NULL),(47,'prashanth@gmail.com','Prashanth','Friend',NULL,NULL,NULL),(48,'Sdk@gmail.com','Sdk','Sdkk',NULL,NULL,NULL),(49,'s@gmail.com','Saimourya','12345678',NULL,NULL,NULL),(50,'Shiva@gmail.com','Shiva','Shiv123',NULL,NULL,NULL),(51,'Jai@gmail.com','Jai','897086',NULL,NULL,NULL),(52,'sanju@gmail.com','Sanju','myPass@123',NULL,NULL,NULL),(53,'vikas@gmail.com','vikas','Vikas@123','8974556565','123 pes, Bengaluru','2004-05-15'),(54,'Vijay@gmail.com','Vijay','Viju123','5648973256','Basaveshwara, banglore','2005-08-15'),(55,'sumukh@gmail.com','Sumukh','Sum1234','8964587766','Hassan , karnataka','2004-06-26'),(56,'pavan@gmail.com','Pavan','Pav12345','6958471234','Kamalanagar banglore ','2004-04-04'),(57,'arun@gmail.com','Arun','Arun123','8569644788','Yashwanthpur banglore','2004-05-25'),(58,'shravan@gmail.com','Shravan','Shravan123','9856487355','pes clg , banglore','2004-05-27'),(59,'samay@gmail.com','Samay','Samay123','8968748568','Chikkmangaluru','2004-08-21'),(60,'ramesh@gmail.com','Ramesh','Ram123','1234567898','Kumta, karnataka','2000-10-10'),(61,'Ganesh@gmail.com','Ganesh','Gani123','6369463559','Halekatte , Udupi ','2004-06-19'),(62,'m@gmail.com','M','p123','852252525','Gghkkk','2025-06-18'),(63,'Kote@gmail.com','Shashank Kote','Sha123','879678978','Koppal','2004-12-29');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-28 20:40:41
