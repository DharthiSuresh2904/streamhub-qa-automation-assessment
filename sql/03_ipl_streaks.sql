-- Any runs of >=3 consecutive matches (for a player, chronologically) with 30+ runs.
WITH numbered AS (
 SELECT player,match_id,match_date,runs,ROW_NUMBER() OVER(PARTITION BY player ORDER BY match_date,match_id) AS seq
 FROM performances WHERE season=2024
), qualified AS (
 SELECT *,ROW_NUMBER() OVER(PARTITION BY player ORDER BY seq) AS good_seq
 FROM numbered WHERE runs>=30
), streaks AS (
 SELECT player,MIN(match_date) AS streak_start,COUNT(*) AS matches_in_streak
 FROM qualified GROUP BY player,seq-good_seq
 HAVING COUNT(*)>=3
)
SELECT player,streak_start,matches_in_streak FROM streaks ORDER BY player,streak_start;
