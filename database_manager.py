import database_connection
from psycopg2 import sql


@database_connection.connection_handler
def register(cursor, user, password):
    query = """
            INSERT INTO "users" (username, password)
            VALUES (%s, %s);"""

    cursor.execute(query, (user, password, ))


@database_connection.connection_handler
def get_users_data(cursor):
    query = """ 
            SELECT username, password
            FROM users;"""
    
    cursor.execute(query)
    return cursor.fetchall()


@database_connection.connection_handler
def get_id_by_user(cursor, username):
    query = """
            SELECT id
            FROM users
            WHERE username = %s"""

    cursor.execute(query, (username, ))
    return cursor.fetchone()


@database_connection.connection_handler
def add_fav_planet(cursor, p_id, p_name, user_id):
    query = """
            INSERT INTO "planets" (planet_id, planet_name, user_id, submission_time)
            VALUES (%s, %s, %s, NOW());"""

    cursor.execute(query, (p_id, p_name, user_id, ))


@database_connection.connection_handler
def get_stats(cursor):
    query = """
            SELECT
                planet_name as planet,
                COUNT(*) as votes
            FROM
                planets
            GROUP BY
                planet_name
            ORDER BY
                COUNT(*) DESC;"""

    cursor.execute(query)
    return cursor.fetchall()
