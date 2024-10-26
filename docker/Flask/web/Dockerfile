FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip install --no-chache-dir requirements.txt

COPY . .

CMD [ "python", "app.py" ]