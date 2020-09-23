import psycopg2
import psycopg2.extras
import os


def get_connection_string():
    USER = 'bobel'
    PASSWORD = 'parola_sql'
    HOST = 'localhost'
    DBNAME = 'apiwars'
    # USER = os.environ.get('USER')
    # PASSWORD = os.environ.get('PASSWORD')
    # HOST = os.environ.get('HOST')
    # DBNAME = os.environ.get('DATABASE')

    if all([USER, PASSWORD, HOST, DBNAME]):
        sql_path = f'postgresql://{USER}:{PASSWORD}@{HOST}/{DBNAME}'
        return sql_path
    else:
        raise KeyError('PostgreSQL credentials not defined')


def open_database():
    conn_string = get_connection_string()
    connection = psycopg2.connect(conn_string)
    connection.autocommit = True

    return connection


def connection_handler(function):
    def wrapper(*args, **kwargs):
        connection = open_database()
        cur = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        result = function(cur, *args, **kwargs)
        cur.close()
        connection.close()
        return result

    return wrapper
