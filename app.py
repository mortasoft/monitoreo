from flask import Flask, render_template, request
import sqlite3
import datetime
from sqlite3 import Error
app = Flask(__name__)

@app.route('/')
def home():
    date = datetime.datetime.now()
    datos_uptime = obtener_datos_uptime()
    datos_latencia = obtener_datos_latency()
    columnas = ["Sitio","Fecha", "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","00","Total"]
    return render_template('index.html', date = date, datos = datos_uptime, columnas = columnas, datos2= datos_latencia)

@app.route('/sitios')
def sitios():
    date = datetime.datetime.now()
    datos = obtener_sitios()
    columnas = ["Url","Descripción", "Tipo_Request", "Intervalo", "Activo"]
    return render_template('sitios.html', date = date, datos = datos, columnas = columnas)

@app.route('/registros')
def registros():
    date = datetime.datetime.now()
    datos = obtener_registros()
    columnas = ["Id","Url", "Hora Inicio", "Hora Fin", "Transcurrido","Latencia","Status","Resultado"]
    return render_template('registros.html', date = date, datos = datos, columnas = columnas)


def obtener_sitios():
    try:
        salida = []
        con = sqlite3.connect("monitoreo_db.db")
        cursor = con.cursor()
        cursor.execute('select * from sitios')
        filas = cursor.fetchall()
        return filas
    except Error as e:
        print(e)


def obtener_registros():
    try:
        salida = []
        con = sqlite3.connect("monitoreo_db.db")
        cursor = con.cursor()
        cursor.execute('select * from registro order by id desc LIMIT 1000')
        filas = cursor.fetchall()
        return filas
    except Error as e:
        print(e)


def obtener_datos_uptime(fecha=None):
    try:
        salida = []
        con = sqlite3.connect("monitoreo_db.db")
        cursor = con.cursor()
        if fecha == None:
            cursor.execute('''
                SELECT
                s.description as url, 
                strftime('%Y-%m-%d', start_time) as fecha,
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='01' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='01' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '01',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='02' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='02' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '02',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='03' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='03' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '03',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='04' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='04' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '04',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='05' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='05' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '05',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='06' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='06' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '06',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='07' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='07' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '07',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='08' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='08' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '08',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='09' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='09' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '09',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='10' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='10' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '10',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='11' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='11' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '11',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='12' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='12' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '12',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='13' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='13' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '13',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='14' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='14' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '14',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='15' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='15' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '15',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='16' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='16' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '16',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='17' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='17' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '17',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='18' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='18' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '18',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='19' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='19' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '19',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='20' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='20' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '20',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='21' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='21' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '21',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='22' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='22' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '22',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='23' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='23' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '23',
                ifnull((ROUND(sum(case WHEN strftime('%H', start_time)='00' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='00' THEN 1.0 ELSE 0 END),4) * 100)|| '%','-') as '00',
                ifnull(ROUND((SUM(case when status=200 then 1 ELSE 0.0 END) / COUNT(status)) * 100.0,2) || '%' ,'-') as total
                FROM registro r join sitios s on r.url=s.url
                where s.enabled = 1
                GROUP BY description, strftime('%Y-%m-%d', start_time)
				order by 1,2;
                ''')
        else:
            cursor.execute('''
                SELECT
                url, 
                strftime('%Y-%m-%d', start_time) as fecha,
                ROUND(sum(case WHEN strftime('%H', start_time)='01' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='01' THEN 1.0 ELSE 0 END),5) * 100 as '01',
                ROUND(sum(case WHEN strftime('%H', start_time)='02' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='02' THEN 1.0 ELSE 0 END),5) * 100 as '02',
                ROUND(sum(case WHEN strftime('%H', start_time)='03' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='03' THEN 1.0 ELSE 0 END),5) * 100 as '03',
                ROUND(sum(case WHEN strftime('%H', start_time)='04' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='04' THEN 1.0 ELSE 0 END),5) * 100 as '04',
                ROUND(sum(case WHEN strftime('%H', start_time)='05' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='05' THEN 1.0 ELSE 0 END),5) * 100 as '05',
                ROUND(sum(case WHEN strftime('%H', start_time)='06' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='06' THEN 1.0 ELSE 0 END),5) * 100 as '06',
                ROUND(sum(case WHEN strftime('%H', start_time)='07' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='07' THEN 1.0 ELSE 0 END),5) * 100 as '07',
                ROUND(sum(case WHEN strftime('%H', start_time)='08' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='08' THEN 1.0 ELSE 0 END),5) * 100 as '08',
                ROUND(sum(case WHEN strftime('%H', start_time)='09' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='09' THEN 1.0 ELSE 0 END),5) * 100 as '09',
                ROUND(sum(case WHEN strftime('%H', start_time)='10' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='10' THEN 1.0 ELSE 0 END),5) * 100 as '10',
                ROUND(sum(case WHEN strftime('%H', start_time)='11' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='11' THEN 1.0 ELSE 0 END),5) * 100 as '11',
                ROUND(sum(case WHEN strftime('%H', start_time)='12' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='12' THEN 1.0 ELSE 0 END),5) * 100 as '12',
                ROUND(sum(case WHEN strftime('%H', start_time)='13' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='13' THEN 1.0 ELSE 0 END),5) * 100 as '13',
                ROUND(sum(case WHEN strftime('%H', start_time)='14' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='14' THEN 1.0 ELSE 0 END),5) * 100 as '14',
                ROUND(sum(case WHEN strftime('%H', start_time)='15' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='15' THEN 1.0 ELSE 0 END),5) * 100 as '15',
                ROUND(sum(case WHEN strftime('%H', start_time)='16' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='16' THEN 1.0 ELSE 0 END),5) * 100 as '16',
                ROUND(sum(case WHEN strftime('%H', start_time)='17' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='17' THEN 1.0 ELSE 0 END),5) * 100 as '17',
                ROUND(sum(case WHEN strftime('%H', start_time)='18' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='18' THEN 1.0 ELSE 0 END),5) * 100 as '18',
                ROUND(sum(case WHEN strftime('%H', start_time)='19' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='19' THEN 1.0 ELSE 0 END),5) * 100 as '19',
                ROUND(sum(case WHEN strftime('%H', start_time)='20' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='20' THEN 1.0 ELSE 0 END),5) * 100 as '20',
                ROUND(sum(case WHEN strftime('%H', start_time)='21' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='21' THEN 1.0 ELSE 0 END),5) * 100 as '21',
                ROUND(sum(case WHEN strftime('%H', start_time)='22' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='22' THEN 1.0 ELSE 0 END),5) * 100 as '22',
                ROUND(sum(case WHEN strftime('%H', start_time)='23' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='23' THEN 1.0 ELSE 0 END),5) * 100 as '23',
                ROUND(sum(case WHEN strftime('%H', start_time)='00' and status = 200 THEN 1.0 ELSE 0 END) / sum(case WHEN strftime('%H', start_time)='00' THEN 1.0 ELSE 0 END),5) * 100 as '00'
                FROM registro
                where url = 'https://192.168.1.171'
                GROUP BY url, strftime('%Y-%m-%d', start_time);
                ''')
        filas = cursor.fetchall()
        return filas
    except Error as e:
        print(e)

def obtener_datos_latency(fecha=None):
    try:
        salida = []
        con = sqlite3.connect("monitoreo_db.db")
        cursor = con.cursor()
        if fecha == None:
            cursor.execute('''
                SELECT s.description, 
                strftime('%Y-%m-%d', start_time) as fecha,
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='01' THEN latency END),2)),'-') as '01',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='02' THEN latency END),2)),'-') as '02',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='03' THEN latency END),2)),'-') as '03',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='04' THEN latency END),2)),'-') as '04',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='05' THEN latency END),2)),'-') as '05',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='06' THEN latency END),2)),'-') as '06',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='07' THEN latency END),2)),'-') as '07',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='08' THEN latency END),2)),'-') as '08',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='09' THEN latency END),2)),'-') as '09',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='10' THEN latency END),2)),'-') as '10',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='11' THEN latency END),2)),'-') as '11',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='12' THEN latency END),2)),'-') as '12',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='13' THEN latency END),2)),'-') as '13',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='14' THEN latency END),2)),'-') as '14',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='15' THEN latency END),2)),'-') as '15',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='16' THEN latency END),2)),'-') as '16',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='17' THEN latency END),2)),'-') as '17',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='18' THEN latency END),2)),'-') as '18',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='19' THEN latency END),2)),'-') as '19',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='20' THEN latency END),2)),'-') as '20',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='21' THEN latency END),2)),'-') as '21',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='22' THEN latency END),2)),'-') as '22',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='23' THEN latency END),2)),'-') as '23',
                ifnull((ROUND(AVG(case WHEN strftime('%H', start_time)='00' THEN latency END),2)),'-') as '00',
                ifnull((ROUND(AVG(latency),2)),'-') as 'Total'
                FROM registro r join sitios s on r.url=s.url
                GROUP BY r.url, strftime('%Y-%m-%d', start_time);
                ''')
        else:
            cursor.execute('''
                SELECT
                url, 
                strftime('%Y-%m-%d', start_time) as fecha,
                ifnull(ROUND((case WHEN strftime('%H', start_time)='01' THEN AVG(latency) END),2),'-' )as '01',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='02' THEN AVG(latency) END),2),'-' )as '02',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='03' THEN AVG(latency) END),2),'-' )as '03',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='04' THEN AVG(latency) END),2),'-' )as '04',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='05' THEN AVG(latency) END),2),'-' )as '05',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='06' THEN AVG(latency) END),2),'-' )as '06',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='07' THEN AVG(latency) END),2),'-' )as '07',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='08' THEN AVG(latency) END),2),'-' )as '08',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='09' THEN AVG(latency) END),2),'-' )as '09',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='10' THEN AVG(latency) END),2),'-' )as '10',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='11' THEN AVG(latency) END),2),'-' )as '11',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='12' THEN AVG(latency) END),2),'-' )as '12',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='13' THEN AVG(latency) END),2),'-' )as '13',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='14' THEN AVG(latency) END),2),'-' )as '14',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='15' THEN AVG(latency) END),2),'-' )as '15',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='16' THEN AVG(latency) END),2),'-' )as '16',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='17' THEN AVG(latency) END),2),'-' )as '17',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='18' THEN AVG(latency) END),2),'-' )as '18',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='19' THEN AVG(latency) END),2),'-' )as '19',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='20' THEN AVG(latency) END),2),'-' )as '20',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='21' THEN AVG(latency) END),2),'-' )as '21',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='22' THEN AVG(latency) END),2),'-' )as '22',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='23' THEN AVG(latency) END),2),'-' )as '23',
                ifnull(ROUND((case WHEN strftime('%H', start_time)='00' THEN AVG(latency) END),2),'-' )as '00'
                FROM registro
                GROUP BY url, strftime('%Y-%m-%d', start_time);
                ''')
        filas = cursor.fetchall()
        return filas
    except Error as e:
        print(e)

if __name__ == '__main__':
   app.run(debug = True)