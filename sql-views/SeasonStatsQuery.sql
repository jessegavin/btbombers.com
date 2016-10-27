CREATE VIEW SeasonStatsQuery AS
SELECT DISTINCT
	Count(*) AS GP, 
	Players.PlayerName, 
	Seasons.SeasonName, 
	Sum(PlayerStats.AB) + Sum(PlayerStats.BB) + Sum(PlayerStats.SAC) AS [PA],
	Sum(PlayerStats.AB) AS AB, 
	Sum(PlayerStats.R) AS R, 
	Sum(PlayerStats.H) AS H, 
	Sum(PlayerStats.[2B]) AS [2B], 
	Sum(PlayerStats.[3B]) AS [3B], 
	Sum(PlayerStats.HR) AS HR, 
	Sum(PlayerStats.RBI) AS RBI, 
	Sum(PlayerStats.BB) AS BB, 
	Players.ID AS PlayerID, 
	Seasons.ID AS SeasonID, 
	Sum(PlayerStats.SAC) AS SAC, 
	Players.isSub
FROM 
	Seasons 
	INNER JOIN Games ON Seasons.ID = Games.SeasonID
	INNER JOIN PlayerStats ON Games.ID = PlayerStats.GameID
	INNER JOIN Players ON Players.ID = PlayerStats.PlayerID
GROUP BY 
	Players.PlayerName, 
	Seasons.SeasonName, 
	Players.ID, 
	Seasons.ID, 
	Players.isSub;