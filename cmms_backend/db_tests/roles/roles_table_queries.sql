USE Magazine_Module_DB;

-- INSERTING INITIAL ROLES
INSERT INTO roles(role_name) 
VALUES 
	('admin'),
	('moderator'),
	('user');


--GETING ALL ROLES
SELECT * FROM roles

--GETING SPECIFIED ROLE
SELECT * FROM roles WHERE role_name = 'moderator'