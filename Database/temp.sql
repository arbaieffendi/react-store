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
