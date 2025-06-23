FROM python:3.12

WORKDIR /backend
COPY backend/ .
COPY requiremets.txt .

RUN pip install --no-cache-dir -r requiremets.txt

CMD ["python", "main.py"]