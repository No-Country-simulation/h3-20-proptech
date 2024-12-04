FROM python:3.10-slim

WORKDIR /server

COPY server/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV DJANGO_SETTINGS_MODULE=core.settings