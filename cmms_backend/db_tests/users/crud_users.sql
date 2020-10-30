USE Magazine_Module_DB;

-- INSERT TEST VALUES
INSERT INTO users(
	login,
	password,
	email,
	first_name,
	last_name,
	role_id
)
VALUES (
		'tobiaszciesielski',
		'123',
		'tobiasz.ciesielski@gestamp.pl',
		'Tobiasz',
		'Ciesielski',
		(SELECT role_id FROM roles WHERE role_name = 'admin')
	), (
		'przemekprzybylski',
		'123',
		'przemek.przybylski@gestamp.pl',
		'Tobiasz',
		'Ciesielski',
		(SELECT role_id FROM roles WHERE role_name = 'admin')
	), (
		'jankowalski',
		'123',
		'jan.kowalski@gestamp.pl',
		'Jan',
		'Kowalski',
		(SELECT role_id FROM roles WHERE role_name = 'moderator')
	), (
		'jakubnowak',
		'123',
		'jakub.nowak@gestamp.pl',
		'Jakub',
		'Nowak',
		(SELECT role_id FROM roles WHERE role_name = 'user')
);

-- GET ALL USERS
SELECT 
	user_id,
	login,
	password,
	email,
	first_name,
	last_name,
	(select role_name from roles where role_id = u.role_id) as role,
	last_session
FROM users u
	
-- GET USER BY LOGIN (login action simulation)
SELECT 
	user_id,
	login,
	password,
	email,
	first_name,
	last_name,
	(SELECT role_name FROM roles WHERE role_id = u.role_id) AS ROLE,
	last_session
FROM users u
WHERE login = 'jakubnowak';

--SET LAST_SESSION (simulate action after successful login)
UPDATE users 
SET last_session = GETDATE()
WHERE user_id = 2;

--UPDATE USER DATA (simulate 'edit profile' action, or 'edit user' by admin)
UPDATE users
SET
	login = 'przemyslawprzybylski',
	password = '123',
	email = 'przemyslaw.przybylski@gestamp.pl',
	first_name = 'Przemyslaw',
	last_name = 'Przybylski',
	role_id = (SELECT role_id FROM roles WHERE role_name = 'admin')
WHERE user_id = 2;

--DELETE USER (simulate 'admin delete user' action)
DELETE users 
WHERE user_id = 3;