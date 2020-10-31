USE Magazine_Module_DB;

-- item_id should be known before inserting properties_values
DECLARE @item_id INT = (SELECT item_id FROM items WHERE item_name = 'Galaxy S8')
DECLARE @property_name nvarchar(50) ='Camera';
DECLARE @value_name nvarchar(50) = '1.8f';

-- insert property
DECLARE @property_id INT;
IF NOT EXISTS (SELECT property_id FROM properties 
               WHERE property_name = @property_name)
BEGIN
    INSERT INTO properties(property_name)
    VALUES (@property_name)
		SET @property_id = SCOPE_IDENTITY();
END 
	ELSE 
BEGIN 
	SELECT @property_id = property_id FROM properties 
	WHERE property_name = @property_name;
END 

-- insert value
DECLARE @value_id INT;
IF NOT EXISTS (SELECT value_id FROM [values]
               WHERE value_name = @value_name)
BEGIN
    INSERT INTO [values](value_name)
    VALUES (@value_name);
		SET @value_id = SCOPE_IDENTITY();
END 
	ELSE 
BEGIN 
	SELECT @value_id = value_id FROM [values] 
	WHERE value_name = @value_name;
END 

-- insert property_value 
IF NOT EXISTS (SELECT properties_values_id FROM properties_values pv 
							where pv.item_id = @item_id 
							AND pv.property_id = @property_id
							AND pv.value_id = @value_id)
BEGIN
    INSERT INTO properties_values(item_id, property_id, value_id)
    VALUES (@item_id, @property_id, @value_id)
END

SELECT 
	item_id,
	item_name,
	serial_number,
	ssc.sub_sub_category_name, 
	p.producer_name, 
	in_stock, 
	destiny,
	description,
	storing_location_name
FROM items i
JOIN sub_sub_categories ssc ON ssc.sub_sub_category_id = i.sub_sub_category_id
JOIN producers p ON p.producer_id = i.producer_id
JOIN storing_locations sl ON sl.storing_location_id = i.storing_location_id

select 
	properties_values_id,
	i.item_id,
	i.item_name,
	p.property_name,
	v.value_name
from properties_values pv
	join properties p on p.property_id = pv.property_id
	join [values] v on v.value_id = pv.value_id
	join items i on i.item_id = pv.item_id
	where pv.item_id = @item_id

