use mvonblan_cs355fl20;

/*Lists accessible Domains*/
CREATE OR REPLACE VIEW Online_Domains AS (SELECT * FROM Domain WHERE status='up') UNION (SELECT * FROM Domain WHERE status='redirected');

SELECT * FROM Online_Domains;

/*Updates status of a Domain*/
DELIMITER //
CREATE OR REPLACE FUNCTION Update_Status (
	domain varchar(100),
	stat varchar(12)
)
RETURNS varchar(20)
BEGIN
	IF (stat IN ('up', 'redirected', 'inaccessible', 'error', 'down', 'unknown')) THEN 
		UPDATE Domain SET status = stat WHERE onion_link = domain;
		RETURN 'OK';
	ELSE
		RETURN 'Invalid Status';
	END IF;
END //
DELIMITER ;

SELECT Update_Status('http://darkfailllnkf4vf.onion', 'up');

/*Search procedure, used to search Domains with a keyword*/
DELIMITER //
CREATE OR REPLACE PROCEDURE Search (
	query varchar(100)
)
BEGIN
	SELECT *
	FROM Online_Domains
	WHERE onion_link LIKE CONCAT('%', query, '%')
	OR name LIKE CONCAT('%', query, '%');
END //
DELIMITER ;

CALL Search('dark');

/*Query to connect Sources, Domains and References*/
SELECT source, onion_link, name, reference FROM Domain d JOIN Domain_Source ds ON d.onion_link = ds.domain JOIN Domain_Reference dr ON d.onion_link = dr.domain;

/*Query to count the number of Mirrors per Domain*/
SELECT onion_link, COUNT(document) AS Mirrors FROM Domain LEFT JOIN Mirror_Domain ON onion_link = domain GROUP BY onion_link HAVING Mirrors > 0;

/*Query to list Domains with insufficient information and their References*/
SELECT DISTINCT * FROM Domain_Reference WHERE EXISTS (SELECT * FROM Domain WHERE Domain.onion_link = Domain_Reference.domain AND (owner IS NULL OR dof IS NULL));
