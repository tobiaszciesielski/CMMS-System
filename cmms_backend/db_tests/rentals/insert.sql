
DECLARE @user_id INT = 6;
DECLARE @item_id INT = 2;
DECLARE @rental_count INT = 20;

-- user_id, item_id and rental count should be known before insert

IF ((SELECT in_stock FROM items WHERE item_id = @item_id) - @rental_count >= 0) 
BEGIN
	INSERT INTO rentals
	VALUES (
		@user_id,
		@item_id,
		CURRENT_TIMESTAMP,
		@rental_count
	)

	UPDATE items SET in_stock = in_stock - @rental_count WHERE item_id = @item_id;
END

select * from items;
select * from rentals;

