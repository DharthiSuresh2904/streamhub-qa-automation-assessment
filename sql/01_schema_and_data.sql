DROP TABLE IF EXISTS transfers;
CREATE TABLE transfers (id INTEGER PRIMARY KEY, from_account TEXT NOT NULL, to_account TEXT NOT NULL, amount REAL NOT NULL CHECK (amount>0), transferred_at TEXT NOT NULL);
INSERT INTO transfers VALUES
(1,'A','B',1000,'2024-07-01 09:00:00'),(2,'B','A',950,'2024-07-01 12:00:00'),
(3,'C','D',2000,'2024-07-04 09:00:00'),(4,'D','C',1500,'2024-07-04 10:00:00'),
(5,'E','F',700,'2024-07-05 09:00:00'),(6,'F','E',735,'2024-07-07 14:00:00'),
(7,'G','H',1250,'2024-07-07 09:00:00'),(8,'H','G',1300,'2024-07-08 08:00:00');
DROP TABLE IF EXISTS performances;
CREATE TABLE performances (player TEXT NOT NULL, match_id TEXT NOT NULL, match_date TEXT NOT NULL, runs INTEGER NOT NULL CHECK(runs>=0), season INTEGER NOT NULL, PRIMARY KEY(player,match_id));
INSERT INTO performances VALUES
('Aarav','M01','2024-04-01',31,2024),('Aarav','M02','2024-04-05',42,2024),('Aarav','M03','2024-04-09',38,2024),('Aarav','M04','2024-04-13',12,2024),
('Bharat','M01','2024-04-01',30,2024),('Bharat','M02','2024-04-05',11,2024),('Bharat','M03','2024-04-09',36,2024),('Bharat','M04','2024-04-13',48,2024),('Bharat','M05','2024-04-16',33,2024),
('Charan','M01','2024-04-01',29,2024),('Charan','M02','2024-04-05',33,2024),('Charan','M03','2024-04-09',41,2024);
