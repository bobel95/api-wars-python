from flask import Flask, render_template, request, jsonify, redirect, url_for, flash, session
import bcrypt
import database_manager

app = Flask(__name__)
app.secret_key = "pn9q48v3lseifvcmq4092ct8m3oisdlfg"


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/data', methods=["POST"])
def data():
    data = request.json
    p_id = data.get('id')
    p_name = data.get('name')
    u_id = database_manager.get_id_by_user(session.get('username')).get('id')
    database_manager.add_fav_planet(p_name=p_name, p_id=p_id, user_id=u_id)
    return ''


@app.route('/islogged')
def islogged():
    return '1' if ('username' in session) else '0'


@app.route('/planets-stats')
def stats():
    stats = database_manager.get_stats()
    return jsonify(stats)


@app.route('/login', methods=["POST", "GET"])
def login():
    if request.method == "POST":

        username = request.form.get('username')
        password = request.form.get('password')

        users_data = database_manager.get_users_data()

        for user in users_data:
            valid_user = (username == user['username'])
            valid_password = (bcrypt.checkpw(password.encode('utf8'), user['password'].encode('utf8')))

            if valid_user and valid_password:

                flash('Succesfully logged in')
                session['username'] = username

                return redirect(url_for('home'))

    return render_template("login.html")


@app.route('/logout')
def logout():
    session.pop('username')
    flash('logged out')
    return redirect(url_for('home'))


@app.route('/register', methods=["POST", "GET"])
def register():
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt()).decode('utf8')

        database_manager.register(user=username, password=hashed_password)
        flash('Succesfully registered')
        return redirect(url_for('home'))

    return render_template("register.html")


if __name__ == '__main__':
    app.run(
        debug=True
    )