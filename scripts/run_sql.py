"""Execute SQLite fixtures and save actual query output (no outside dependencies)."""
import sqlite3,csv
from pathlib import Path
root=Path(__file__).resolve().parents[1]
out=root/'reports'/'sql-results';out.mkdir(parents=True,exist_ok=True)
db=out/'assessment.sqlite'
con=sqlite3.connect(db)
con.executescript((root/'sql'/'01_schema_and_data.sql').read_text())
for label,filename in [('round-trip','02_round_trip.sql'),('ipl-streaks','03_ipl_streaks.sql')]:
 cur=con.execute((root/'sql'/filename).read_text());cols=[c[0] for c in cur.description];rows=cur.fetchall()
 with (out/(label+'.csv')).open('w',newline='') as f:
  w=csv.writer(f);w.writerow(cols);w.writerows(rows)
 print(f'{label}: {len(rows)} rows');print(' | '.join(cols));[print(' | '.join(map(str,row))) for row in rows]
con.close()
