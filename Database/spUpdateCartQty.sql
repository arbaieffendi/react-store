/* Create By: Arba
 Last Modified : 2019-07-12
 Description : update cart quantity by id
  */

-- USE STORE;
-- CALL spUpdateCartQty(4, 3, 5);

USE STORE;
DROP PROCEDURE IF EXISTS spAddToCart;
CREATE PROCEDURE spUpdateCartQty(
    CUSTOMERID INT,
    ORDERITEMID INT,
    ISADD BOOLEAN
)
BEGIN

    DECLARE ORDERID VARCHAR(50);

    UPDATE ORDERITEM
    CASE WHEN ISADD = 1 THEN
        SET QUANTITY = QUANTITY+1
        ELSE
        SET QUANTITY = QUANTITY-1
    END
    WHERE ID = ORDERITEMID;

END;