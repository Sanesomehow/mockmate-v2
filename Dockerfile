# Base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Prevent Python from writing bytecode files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Expose port (modify as needed)
EXPOSE 8000

# Command to run the application
CMD ["python", "app.py"]