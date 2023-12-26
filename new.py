
import sqlite3


con = sqlite3.connect('data.db')
cursorObj = con.cursor()

cursorObj.execute('''
     CREATE TABLE IF NOT EXISTS employees (
         id INTEGER PRIMARY KEY,
         sensor STRING,
         pm STRING,
         situation STRING,
         time STRING
     )
 ''')
cursorObj.execute("SELECT * FROM employees")
data = cursorObj.fetchall()

for row in data:
    print(row)
con.close()