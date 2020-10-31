USE Magazine_Module_DB 

INSERT categories(category_name)
VALUES 
	('A'),
	('B'),
	('C')

INSERT sub_categories(sub_category_name, category_id)
VALUES 
	('AA', (SELECT category_id FROM categories WHERE category_name = 'A')),
	('AB', (SELECT category_id FROM categories WHERE category_name = 'A')),
	('BA', (SELECT category_id FROM categories WHERE category_name = 'B')),
	('BB', (SELECT category_id FROM categories WHERE category_name = 'B')),
	('CA', (SELECT category_id FROM categories WHERE category_name = 'C')),
	('CB', (SELECT category_id FROM categories WHERE category_name = 'C')),
	('CC', (SELECT category_id FROM categories WHERE category_name = 'C'));

INSERT sub_sub_categories(sub_sub_category_name, sub_category_id)
VALUES 
	('AAA', (SELECT sub_category_id FROM sub_categories WHERE sub_category_name = 'AA')),
	('ABA', (SELECT sub_category_id FROM sub_categories WHERE sub_category_name = 'AB')),
	('ABC', (SELECT sub_category_id FROM sub_categories WHERE sub_category_name = 'AB')),
	('BA', (SELECT sub_category_id FROM sub_categories WHERE sub_category_name = 'BA')),
	('BBA', (SELECT sub_category_id FROM sub_categories WHERE sub_category_name = 'BB')),
	('CAA', (SELECT sub_category_id FROM sub_categories WHERE sub_category_name = 'CA')),
	('CBA', (SELECT sub_category_id FROM sub_categories WHERE sub_category_name = 'CB')),
	('CC', (SELECT sub_category_id FROM sub_categories WHERE sub_category_name = 'CC'));

SELECT * FROM categories
SELECT * FROM sub_categories
SELECT * FROM sub_sub_categories

-- Receive all nodes above CBA
SELECT 
	category_name,
	sub_category_name,
	sub_sub_category_name
FROM sub_sub_categories
	join sub_categories sc ON sc.sub_category_id = sub_sub_categories.sub_category_id
	join categories c ON c.category_id = sc.category_id
WHERE sub_sub_category_name = 'CBA'

-- Receive all nodes of category
SELECT category_name, sub_category_name, sub_sub_category_name FROM categories c
	join sub_categories sc 
		ON sc.category_id = c.category_id
	join sub_sub_categories ssc 
		ON ssc.sub_category_id = sc.sub_category_id
WHERE category_name = 'B'


-- Update node name
UPDATE sub_sub_categories
SET sub_sub_category_name = 'BAA'
WHERE sub_sub_category_name = 'BA'

