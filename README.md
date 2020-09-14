# API Wars deployment

## Story

*Software deployment is all of the activities that make a software system available for use. The general deployment process consists of several interrelated activities with possible transitions between them.*

In this case, we deploy our Flask application to Heroku, a PaaS (platform as a service) service that you can use for free. In the background materials section at the bottom you'll find a tutorial about how to deploy your app to Heroku. Please read it.

## What are you going to learn?

The objectives are:

- to learn how to use Heroku CLI,
- being able prepare your application for continuous deployment,
- learn how to provision DB on Heroku

## Tasks

1. Create a new account on Heroku and activate it.
    - You can log in to your account on Heroku.

2. Create a new application on Heroku for your API Wars deployment.
    - There is a new app created on your Heroku account.

3. Install Heroku command-line interface.
    - Executing the `heroku --version` command in the shell shows something similar as a result: heroku/7.0.0 (darwin-x64) node-v8.0.0

4. Install the `gunicorn` package using the pip package manager.
    - Executing `pip list | grep -F gunicorn` command in the shell shows a line starting with `gunicorn`

5. Create required config files (`requirements.txt`, `runtime.txt`, `Procfile`) in your project's root folder.
    - Three required config files (`requirements.txt`, `runtime.txt`, `Procfile`) exists in the project's root folder

6. Provision a Postgres DB instance using eg. Heroku Postgres add-on (or any other service), connect to it and create your application schema.
    - Database is created (eg. using Heroku Postgres add-on) and you can connect to it using either `psql` or Heroku CLI commands:
  `heroku login
   heroku pg:psql`.
For more details on connecting to Postgres, check background materials list.
    - Database schema (table structure) for your application is created. Running `\dt` command after connecting to the database lists all required tables. Alternatively (if the above doesn't work), running  `SELECT * FROM pg_catalog.pg_tables
 WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';` 
query should also list all required tables.

7. Build, deploy to Heroku and check if your application is accessible on the internet.
    - Your application has been successfully built and no errors are shown on the console.
    - Application has been deployed to Heroku and is accessible on the internet.
    - The deployed app on Heroku works in the exactly the same way as the one submitted to the API Wars project repository

## General requirements

None

## Hints

- make a `runtime.txt` with one line in it which is your python version (like python-3.5.2 - check <https://devcenter.heroku.com/articles/python-runtimes> what runtimes are available on Heroku),
- be careful with `requirements.txt`. Don't just write the whole `pip freeze` into it. First go through that tutorial and make that basic flask app run. It only needs those things what are screenshot in the tutorial (`flask`, `gunicorn`, `itsdangerous`, `jinja2` etc.). If your app needs more modules, put them into the requirements.txt but only if it is needed!
- Heroku command-line interface can be installed with `wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh` command

## Starting your project

To start your project click [this link](https://journey.code.cool/v2/project/solo/blueprint/api-wars-deployment/general).

## Background materials

- <i class="far fa-exclamation"></i> [Heroku + Flask Tutorial](https://marcellban.github.io/heroku-flask/) (Thanks for one of the Codecoolers, Marcell Bán for this tutorial.)
- <i class="far fa-exclamation"></i> [Heroku Docs - Getting started with Python](https://devcenter.heroku.com/articles/getting-started-with-python)
- <i class="far fa-exclamation"></i> [Deploying Heroku App with Git](https://devcenter.heroku.com/articles/git)
- <i class="far fa-exclamation"></i> [Using Heroku Postgres CLI commands](https://devcenter.heroku.com/articles/heroku-postgresql#using-the-cli)
- <i class="far fa-exclamation"></i> [Connecting to Heroku Postgres database using `psql` command](https://medium.com/@kagaramag/how-to-connect-to-heroku-postgres-database-using-cli-a2e51cc25029)
- <i class="far fa-open_book"></i> [About deployment](https://learn.code.cool/full-stack/#/../pages/devops/deployment)
