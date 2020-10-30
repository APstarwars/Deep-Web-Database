USE mvonblan_cs355fl20;

DROP TABLE IF EXISTS Domain_Source;
DROP TABLE IF EXISTS Domain_Reference;
DROP TABLE IF EXISTS Mirror_Domain;
DROP TABLE IF EXISTS Mirror_Document;
DROP TABLE IF EXISTS Source_Rule;
DROP TABLE IF EXISTS Source;
DROP TABLE IF EXISTS Domain;
DROP TABLE IF EXISTS Reference;

CREATE TABLE Source (
	clearnet_link varchar(100) PRIMARY KEY,
	name varchar(50) UNIQUE
);

CREATE TABLE Source_Rule (
	rule varchar(100) PRIMARY KEY,
	source varchar(100),
	FOREIGN KEY (source)
		REFERENCES Source(clearnet_link)
		ON UPDATE CASCADE
		ON DELETE CASCADE 
);

CREATE TABLE Domain (
	onion_link varchar(100) CHECK (onion_link REGEXP '.*\.onion'),
	name varchar(50) UNIQUE,
	owner varchar(50),
	dof date,
	ssl_verify varchar(50),
	ssl_expire date,
	status varchar(12) CHECK (status IN ('up', 'redirected', 'inaccessible', 'error', 'down', 'unknown')),
	PRIMARY KEY (onion_link)
);

CREATE TABLE Reference (
	clearnet_link varchar(100) PRIMARY KEY
);

CREATE TABLE Mirror_Document (
	pgp_key varchar(10) PRIMARY KEY,
	hash_type varchar(6) CHECK (hash_type IN ('MD5', 'SHA128', 'SHA256'))
);

CREATE TABLE Mirror_Domain (
	document varchar(10),
	domain varchar(100) CHECK (domain REGEXP '.*\.onion'),
	PRIMARY KEY (document, domain),
	FOREIGN KEY (document)
		REFERENCES Mirror_Document(pgp_key)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (domain)
		REFERENCES Domain(onion_link)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Domain_Source (
	domain varchar(100) CHECK (domain REGEXP '.*\.onion'),
	source varchar(100),
	PRIMARY KEY (domain, source),
	FOREIGN KEY (domain)
		REFERENCES Domain(onion_link)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (source)
		REFERENCES Source(clearnet_link)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Domain_Reference (
	domain varchar(100) CHECK (domain REGEXP '.*\.onion'),
	reference varchar(100),
	PRIMARY KEY (domain, reference),
	FOREIGN KEY (domain)
		REFERENCES Domain(onion_link)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (reference)
		REFERENCES Reference(clearnet_link)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);


INSERT INTO Source VALUES ('https://github.com/alecmuffett/real-world-onion-sites', 'Real-World Onion Sites'),
			  ('https://dark.fail', 'dark.fail');

INSERT INTO Source_Rule VALUES ('No sites with an "onion-only" presence', 'https://github.com/alecmuffett/real-world-onion-sites'),
				('No sites for tech with less than 10,000 users', 'https://github.com/alecmuffett/real-world-onion-sites'),
				('No nudity, exploitation, drugs, copyright infringement or sketchy-content sites', 'https://github.com/alecmuffett/real-world-onion-sites');

INSERT INTO Domain VALUES ('http://darkzzx4avcsuofgfez5zq75cqc4mprjvfqywo45dfcaxrwqg6qrlfid.onion/', 'Dark Net Live', NULL, NULL, 'Lets Encrypt', '2021-01-12', 'up'),
			  ('https://privacyintyqcroe.onion/', 'Privacy International', NULL, NULL, 'DigiCert Inc', '2021-08-05', 'up'),
			  ('http://vww6ybal4bd7szmgncyruucpgfkqahzddi37ktceo3ah7ngmcopnpyyd.onion/', 'Riseup Home', NULL, NULL, NULL, NULL, 'up'),
			  ('http://darkfailllnkf4vf.onion', 'dark.fail', NULL, NULL, 'Cloudfare Inc', '2021-07-11', 'up');	

INSERT INTO Reference VALUES ('https://riseup.net/en/security/network-security/tor#riseups-tor-onion-services');

INSERT INTO Domain_Reference VALUES ('http://vww6ybal4bd7szmgncyruucpgfkqahzddi37ktceo3ah7ngmcopnpyyd.onion/', 'https://riseup.net/en/security/network-security/tor#riseups-tor-onion-services');

INSERT INTO Mirror_Document VALUES ('iQIzBAEBCA', 'SHA256');

INSERT INTO Mirror_Domain VALUES ('iQIzBAEBCA', 'http://darkfailllnkf4vf.onion');

INSERT INTO Domain_Source VALUES ('https://privacyintyqcroe.onion/', 'https://github.com/alecmuffett/real-world-onion-sites'),
				 ('http://vww6ybal4bd7szmgncyruucpgfkqahzddi37ktceo3ah7ngmcopnpyyd.onion/', 'https://github.com/alecmuffett/real-world-onion-sites'),
				 ('http://darkfailllnkf4vf.onion', 'https://dark.fail');
