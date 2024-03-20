FROM python:3.10-slim

ENV PYTHONUNBUFFERED True


ENV PORT 8080


COPY src/ /app
WORKDIR /app
RUN apt-get update \
    && apt-get install -qyy -o APT::Install-Recommends=false -o APT::Install-Suggests=false \
    file \
    gcc \
    python3 \
    python3-dev \
    python3-pip \
    python3-setuptools \
    python3-venv 
    
RUN  pip install --upgrade pip
RUN   pip install  --no-cache -r requirements.txt


CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app