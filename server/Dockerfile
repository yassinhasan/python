FROM python:3.10-slim

ENV PYTHONUNBUFFERED True


ENV PORT 8080


COPY src/ /app
WORKDIR /app
RUN apt-get update \
    && apt-get install -qyy -o APT::Install-Recommends=false -o APT::Install-Suggests=false \
    wget\
    file \
    gcc \
    python3 \
    python3-dev \
    python3-pip \
    python3-setuptools \
    python3-venv 


# # Install Chrome
# RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install


RUN  pip install --upgrade pip
RUN   pip install  --no-cache -r requirements.txt


CMD exec gunicorn --bind :$PORT --workers 4 --threads 6 --timeout 0 app:app