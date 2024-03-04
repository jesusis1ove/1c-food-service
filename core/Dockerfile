# pull official base image
FROM python:3.11.3-slim-buster

# set work directory
#WORKDIR /usr/src/app

WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN apt-get update && apt-get install -y build-essential python3-dev python2.7-dev libldap2-dev libsasl2-dev libssl-dev ldap-utils tox lcov valgrind

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .