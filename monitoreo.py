import os
import requests,time
import sqlite3
from sqlite3 import Error
from concurrent.futures import ThreadPoolExecutor

TIMEOUT_TIME = 5
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(BASE_DIR, "monitoreo_db.db")

def crear_db():
    try:
        con = sqlite3.connect(DB)
        cursor = con.cursor()
        cursor.execute("CREATE TABLE sitios(url text PRIMARY KEY, description text, request_type text, monitoring_interval INTEGER,enabled INTEGER)")
        cursor.execute("CREATE TABLE registro(id INTEGER PRIMARY KEY AUTOINCREMENT, url text NOT NULL, start_time text, end_time text, elapsed text,latency INTEGER, status INTEGER, result text)")
        con.commit()
        print("La base de datos se creo correctamente")
    except Error as e:
        print(e)

def crear_sitio(url,descripcion,intervalo,tipo):
    try:
        con = sqlite3.connect(DB)
        cursor = con.cursor()
        cursor.execute('''insert into sitios (url,description,monitoring_interval,request_type,enabled) VALUES (?,?,?,?,1)''', (url,descripcion,intervalo,tipo))
        con.commit()
        print("El registro se inserto correctamente")
        con.close()
    except Error as e:
        print(e)

def crear_log(url,start_time,end_time,elapsed,latency,status,resultado):
    try:
        con = sqlite3.connect(DB)
        cursor = con.cursor()
        cursor.execute('''insert into registro (url,start_time,end_time,elapsed,latency,status,result) VALUES (?,?,?,?,?,?,?)''', (url,start_time,end_time,elapsed,latency,status,resultado))
        con.commit()
        print("Se registro el log de: ",url )
        con.close()
    except Error as e:
        print(e)

def ver_sitios():
    try:
        con = sqlite3.connect(DB)
        cursor = con.cursor()
        cursor.execute('select * from sitios')
        filas = cursor.fetchall()
        for fila in filas:
            print(fila)
        con.close()
    except Error as e:
        print(e)

def iniciar_proceso():

    datos = []

    try:
        con = sqlite3.connect(DB)
        cursor = con.cursor()
        cursor.execute('select * from sitios where enabled = 1')
        filas = cursor.fetchall()

        for fila in filas:
            url = fila[0]
            tipo = fila[2] 
            intervalo = fila[3]
            datos.append([url,tipo,intervalo])

        con.close()
    
        with ThreadPoolExecutor(max_workers=10) as pool:
            response_list = list(pool.map(monitorear,datos))

    except Error as e:
        print(e)

def monitorear(args):
    url = args [0]
    tipo = args [1]
    intervalo = args [2]

    print("Monitoreando",url)
    start_time = time.time()
    try:
        if tipo.lower() == 'post':
            request = requests.post(url, timeout=5)
            status = request.status_code
            end_time = time.time()
            elapsed = end_time - start_time
            start_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(start_time))
            latency = request.elapsed.microseconds/1000
            crear_log(url,str(start_time),str(end_time),str(elapsed),latency,status,_parse_result_code(status))
        
        if tipo.lower() == 'get':
            request = requests.get(url, timeout=5)
            status = request.status_code
            end_time = time.time()
            elapsed = end_time - start_time
            start_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(start_time))
            end_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
            latency = request.elapsed.microseconds/1000
            crear_log(url,str(start_time),str(end_time),str(elapsed),latency,status,_parse_result_code(status))

    except requests.exceptions.Timeout:
        end_time = time.time()
        elapsed = end_time - start_time
        start_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(start_time))
        end_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(end_time))
        latency = -1
        crear_log(url,str(start_time),str(end_time),str(elapsed),latency,408,_parse_result_code(408))
    except requests.exceptions.TooManyRedirects:
        end_time = time.time()
        elapsed = end_time - start_time
        start_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(start_time))
        end_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(end_time))
        crear_log(url,str(start_time),str(end_time),str(elapsed),408,_parse_result_code(408))
    except requests.exceptions.ConnectionError:
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
        print("No hay conexion a internet",timestamp)

    except requests.exceptions.RequestException as e:
        end_time = time.time()
        elapsed = end_time - start_time
        start_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(start_time))
        end_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(end_time))
        latency = request.elapsed.microseconds/1000
        crear_log(url,str(start_time),str(end_time),str(elapsed),latency,408,_parse_result_code(408))
    
    except Exception as e:
        print(e)

    time.sleep(intervalo)
    monitorear(args)


def _parse_result_code(code):
    if code == 200:
        return "Ok"
    if code == 408:
        return "Timeout"
    else:
        return "error"

if __name__ == '__main__':
    iniciar_proceso()