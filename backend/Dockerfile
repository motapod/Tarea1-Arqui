FROM python:3.9

WORKDIR /app

RUN pip install pymysql

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

# Definir variables de entorno
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]