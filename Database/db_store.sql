USE store;

DROP TABLE IF EXISTS `ORDERITEM`;
DROP TABLE IF EXISTS `ORDERS`;
DROP TABLE IF EXISTS `CUSTOMER`;
DROP TABLE IF EXISTS `PRODUCT`;

CREATE TABLE IF NOT EXISTS `CUSTOMER` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FIRSTNAME` varchar(50) NOT NULL,
  `LASTNAME` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
);
CREATE TABLE IF NOT EXISTS `ORDERS` (
  `ID` varchar(50) NOT NULL,
  `CREATEDATE` DATETIME,
  `TOTAL` decimal NOT NULL,
  `STATUS` varchar(50) NOT NULL,
  `CUSTOMERID` int(11),
  PRIMARY KEY (`ID`),
  FOREIGN KEY(CUSTOMERID) REFERENCES CUSTOMER(ID)
);
CREATE TABLE IF NOT EXISTS `ORDERITEM` (
  `ID` VARCHAR(16) NOT NULL,
  `ORDERID` varchar(50) NOT NULL,
  `PRODUCTID` int(11) NOT NULL,
  `QUANTITY` int NOT NULL DEFAULT '0',
  `PRICE` decimal NOT NULL DEFAULT '0',
  `UNIT` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (ORDERID) REFERENCES ORDERS(ID)
);

DELETE FROM CUSTOMER;
INSERT INTO `CUSTOMER`(FIRSTNAME, LASTNAME, EMAIL)
VALUES('ARBAI', 'EFFENDI', 'arbaieffendi@gmail.com'),
      ('BOB', 'MARLEY', 'bob@gmail.com'),
      ('JEFF', 'OX', 'jeff@gmail.com');
SELECT * FROM CUSTOMER limit 10;

CREATE TABLE IF NOT EXISTS `PRODUCT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) NOT NULL,
  `CATEGORY` varchar(25) NOT NULL DEFAULT 'UNCATEGORIZED',
  `DESCRIPTION` varchar(100),
  `PRICE` decimal NOT NULL DEFAULT '0',
  `UNIT` varchar(20) NOT NULL,
  `QUANTITY` int NOT NULL DEFAULT '0',
  `ISACTIVE` boolean NOT NULL DEFAULT '0',
  `IMAGE_URL` varchar(300),
  PRIMARY KEY (`ID`)
);

DELETE FROM PRODUCT;
INSERT INTO `PRODUCT`(NAME, DESCRIPTION, CATEGORY, PRICE, UNIT, QUANTITY)
VALUES('Naga Merah Super', 'DISKON 20%', 'BUAH', 20000, 'kg', 100),
      ('Timun Suri', 'Segar', 'BUAH', 15000, 'kg', 100),
      ('Pisang Ambon', 'LOREM IMSUM', 'LOREM IMSUM', 15000, 'kg', 100),
      ('Wortel Brastagi', 'LOREM IMSUM', 'LOREM IMSUM', 15000, 'kg', 100),
      ('Terong Ungu Bulat', 'LOREM IMSUM', 'LOREM IMSUM', 15000, 'kg', 100),
      ('Melon Golden Baby', 'LOREM IMSUM', 'LOREM IMSUM', 15000, 'kg', 100),
      ('Zukini', 'LOREM IMSUM', 'LOREM IMSUM', 15000, 'kg', 100),
      ('Matoa', 'LOREM IMSUM', 'LOREM IMSUM', 15000, 'kg', 100),
      ('Pisang Susu Sereh', 'LOREM IMSUM', 'LOREM IMSUM', 15000, 'sisir', 100),
      ('Salak Pondoh', 'LOREM IMSUM', 'LOREM IMSUM', 15000, 'kg', 100),
      ('Tomat Cherry Merah', 'LOREM IMSUM', 'LOREM IMSUM', 15000, 'pack', 100),
      ('Telur Ayam Negeri', 'LOREM IMSUM', 'LOREM IMSUM', 15000, 'kg', 100);

UPDATE PRODUCT SET IMAGE_URL = 'https://charliesfruitonline.com.au/wp-content/uploads/2014/01/Granny-Smith-Apple-1-e1484884328222.png';
SELECT * FROM PRODUCT limit 10;