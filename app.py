import datetime
from datetime import datetime
import os
from flask import Flask, jsonify, render_template
import sqlite3

app = Flask(__name__)

@app.route('/')
def api():
    return render_template('main.html')

@app.route('/data/get/<string:sensor>/<string:location>/<string:pm>/<string:situation>')
def get(sensor, location, pm, situation):
    con = sqlite3.connect('data.db')
    cursor = con.cursor()
    cursor.execute("INSERT INTO employees (sensor, location, pm, situation, time) VALUES (?, ?, ?, ?, ?)", 
                   (sensor, location, pm, situation, datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    con.commit()
    con.close()
    return 'succeed'

    
@app.route('/fetchdata')
def fetch():
    try:
        con = sqlite3.connect('data.db')  
        cursor = con.cursor()
        cursor.execute('SELECT * FROM employees')
        data = cursor.fetchall()
        data_list = [{'id': row[0],'sensor': row[1], 'location': row[2], 'pm' : row[3], 'situation' : row[4], 'time' : row[5]} for row in data]
        con.close()
        return jsonify(data_list)
    except Exception as e:
        return jsonify({'Error': str(e)})
    
@app.route('/del/data/all')
def deldata():
    con = sqlite3.connect('data.db')
    cursor = con.cursor()

    cursor.execute("DELETE FROM employees")
    con.commit()

    con.close()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  
    app.run(host='0.0.0.0', port=port)