CREATE VIEW GameByGameQuery AS
SELECT DISTINCT 
	g.GameDate, 
	g.GameTime, 
	g.Opponent, 
	g.Field, 
	g.ID AS GameID, 
	g.GameNumber, 
	p.PlayerName, 
	s.SeasonName, 
	ps.BattingPosition, 
	Sum(ps.AB) AS AB, 
	Sum(ps.AB) + Sum(ps.BB) + Sum(ps.SAC) AS [PA],
	Sum(ps.R) AS R, 
	Sum(ps.H) AS H, 
	Sum(ps.[2B]) AS [2B], 
	Sum(ps.[3B]) AS [3B], 
	Sum(ps.HR) AS HR, 
	Sum(ps.RBI) AS RBI, 
	(Sum(ps.H)+Sum(ps.[2B])+2*(Sum(ps.[3B]))+3*(Sum(ps.HR))) AS TB, 
	Sum(ps.BB) AS BB, 
	p.Position, 
	p.ID AS PlayerID, 
	s.ID AS SeasonID, 
	Sum(ps.SAC) AS SAC
FROM 
	Seasons s 
	INNER JOIN Games g ON s.ID = g.SeasonID 
	INNER JOIN PlayerStats ps ON g.ID = ps.GameID 
	INNER JOIN Players p ON p.ID = ps.PlayerID
GROUP BY 
	g.GameDate, 
	g.GameTime, 
	g.Opponent, 
	g.Field, 
	g.ID, 
	g.GameNumber, 
	p.PlayerName, 
	s.SeasonName, 
	ps.BattingPosition, 
	p.Position, 
	p.ID, 
	s.ID;