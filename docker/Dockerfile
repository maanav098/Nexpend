FROM python:3.10.13-slim-bullseye

WORKDIR /app

COPY ../backend /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
