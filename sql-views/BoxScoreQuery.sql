CREATE VIEW BoxScoreQuery AS
SELECT 
  g.*, 
  IFNULL( CAST(g.H AS FLOAT)/NULLIF(g.AB,0) ,0) AS [AVG], 
  IFNULL((CAST(g.H AS FLOAT)+(g.[2B])+(2*g.[3B])+(3*g.HR))/NULLIF(g.AB,0), 0) AS [SLG], 
  IFNULL((CAST(g.H AS FLOAT)+g.BB)/NULLIF(g.AB+g.BB+g.SAC,0), 0) AS OBP,
  IFNULL(((CAST(g.H AS FLOAT)+g.BB)/(NULLIF(g.AB,0)+g.BB+g.SAC))+((CAST(g.H AS FLOAT)+(g.[2B])+(2*g.[3B])+(3*g.HR))/NULLIF(g.AB,0)), 0) AS OPS
FROM GameByGameQuery g;