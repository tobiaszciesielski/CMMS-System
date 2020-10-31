USE Magazine_Module_DB

DECLARE @item_name NVARCHAR(255) = 'P30';
DECLARE @serial_number NVARCHAR(255) = 'CCC-111-DDD-000';
DECLARE @producer_name NVARCHAR(50) = 'Huawei';
DECLARE @producer_code NVARCHAR(255) = '8ymh3u48i93f2u9r9777f';

-- If producer exists we select id, if not we insert into producers
DECLARE @producer_id INT;
IF NOT EXISTS (SELECT producer_id FROM producers WHERE producer_name = @producer_name) BEGIN 
	INSERT INTO producers(producer_name, producer_code)
	VALUES (@producer_name, @producer_code);
	SET @producer_id = SCOPE_IDENTITY();
END ELSE BEGIN 
	SELECT @producer_id = producer_id FROM producers WHERE producer_name = @producer_name;
END 

DECLARE @sub_sub_category_id INT = 9;	-- Should be known before insert
DECLARE @in_stock INT = 999;											
DECLARE @destiny NVARCHAR(50) = 'Created for photographers';			
DECLARE @description NVARCHAR(255) = 'Smartphone with the best camera on the market. Night or day, doest matter - your photo will beat competition.'
DECLARE @storing_location_name NVARCHAR(50) = 'R-21/C-66';		

-- If name of storing location exists we select id, if not we insert into storing_locations
DECLARE @storing_location_id INT;
IF NOT EXISTS (SELECT storing_location_id FROM storing_locations WHERE storing_location_name = @storing_location_name) BEGIN 
	INSERT INTO storing_locations(storing_location_name)
	VALUES (@storing_location_name);
	SET @storing_location_id = SCOPE_IDENTITY();
END ELSE BEGIN 
	SELECT @storing_location_id = storing_location_id FROM storing_locations WHERE storing_location_name = @storing_location_name;
END 


INSERT INTO items (
	item_name,
	serial_number,
	sub_sub_category_id,
	producer_id,
	in_stock,
	destiny,
	description,
	storing_location_id
)
VALUES (
	@item_name, 
	@serial_number, 
	@sub_sub_category_id, 
	@producer_id,
	@in_stock, 									
	@destiny, 	
	@description,
	@storing_location_id
)

select * from items