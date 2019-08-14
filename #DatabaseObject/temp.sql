select * from customer;
select * from orders;
select * from orderitem;
select * from product;
-- update product set quantity = 10, isactive = 1;

CALL spAddToCart(1, 1, 3);
SELECT * FROM orderitem;
select * from orders;
select * from product;

DELETE FROM orderitem;
DELETE FROM ORDERS;
select * from orders;

UPDATE ORDERS
SET TOTAL = (SELECT SUM(oi.PRICE) FROM orderitem oi WHERE oi.ORDERID = '201907131-1')
WHERE ID = '201907131-1'

-- DECLARE ID INT;
-- SET ID = 1;

SET @ID = 1;
SELECT @ID AS `t`, o.*
    FROM ORDERS O
    WHERE CUSTOMERID = @ID

SELECT 'CART', 0
FROM ORDERS 
LIMIT 1;

select * from product limit 0,3;
select * from product limit 3,3;

DELETE FROM ORDERITEM;
DELETE FROM ORDERS;

CALL spAddToCart(1, 1, 2);
CALL spAddToCart(1, 2, 2);
CALL spAddToCart(1, 3, 2);
CALL spAddToCart(1, 4, 2);

SELECT * FROM ORDERS;
SELECT * FROM ORDERITEM;

SELECT OI.* FROM ORDERS O INNER JOIN ORDERITEM OI ON O.ID = OI.ORDERID
WHERE O.CUSTOMERID = 1 AND OI.ORDERID = '201907211-1'

SELECT * FROM (SELECT '', '', '', 'CART', 0) AS temp LIMIT 1;

SELECT * FROM ORDERITEM OI WHERE ID = '4d1169a8-ab8c-11e9-b373-3c970ebe8341';
UPDATE ORDERITEM
SET QUANTITY = QUANTITY-1
WHERE ID = '4d1169a8-ab8c-11e9-b373-3c970ebe8341';
SELECT * FROM ORDERITEM OI WHERE ID = '4d1169a8-ab8c-11e9-b373-3c970ebe8341';



SELECT OI.*, P.NAME, P.IMAGE_URL FROM ORDERS O 
INNER JOIN ORDERITEM OI ON O.ID = OI.ORDERID
INNER JOIN PRODUCT P ON OI.PRODUCTID = P.ID
WHERE O.CUSTOMERID = 1