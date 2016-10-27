CREATE VIEW StatsQuery AS

SELECT 
	*,
	CAST(H AS FLOAT)/AB AS [AVG],
	(CAST(H AS FLOAT)+([2B])+(2*[3B])+(3*HR))/AB AS SLG,
	((CAST(H AS FLOAT)+BB)/(AB+BB+SAC)) AS OBP,
	((H)+([2B])+(2*[3B])+(3*HR)) AS TB,
	((CAST(H AS FLOAT)+BB)/(AB+BB+SAC)) + ((CAST(H AS FLOAT)+([2B])+(2*[3B])+(3*HR))/AB) AS OPS
FROM SeasonStatsQuery;