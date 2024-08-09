#!/bin/bash

# 환경 변수 설정
DOCKER_HUB_USERNAME=kurigohan73
DOCKER_IMAGE_NAME=backend
DOCKER_IMAGE_TAG=latest
EC2_USER=ec2-user
EC2_IP=54.180.154.223
PEM_PATH=~/Desktop/aikey.pem

# Docker Hub에 로그인
echo "Logging into Docker Hub..."
docker login --username $DOCKER_HUB_USERNAME || { echo 'Docker Hub login failed' ; exit 1; }

# Buildx 빌더 생성 (필요시)
echo "Setting up Buildx..."
docker buildx create --use || { echo 'Failed to create buildx builder' ; exit 1; }

# Docker 이미지를 빌드 및 푸시
echo "Building and pushing Docker images with Buildx..."
docker buildx build --platform linux/amd64 -t $DOCKER_HUB_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG --push . || { echo 'Docker build failed' ; exit 1; }

# SSH 접속 확인
echo "Connecting to EC2 instance..."
ssh -i "$PEM_PATH" "$EC2_USER@$EC2_IP" "echo 'Connected to EC2 instance.'"

# EC2 인스턴스에 Docker 및 Docker Compose 설치 (필요시)
echo "Installing Docker and Docker Compose on EC2 if not installed..."
ssh -i "$PEM_PATH" "$EC2_USER@$EC2_IP" << EOF
    if ! command -v docker &> /dev/null; then
        echo "Docker not found. Installing Docker..."
        sudo amazon-linux-extras install docker -y
        sudo service docker start
        sudo usermod -a -G docker ec2-user
    fi

    if ! command -v docker-compose &> /dev/null; then
        echo "Docker Compose not found. Installing Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi

    mkdir -p /home/ec2-user/project-root/
EOF

# Docker Compose 파일을 EC2로 전송
echo "Uploading Docker Compose file to EC2..."
scp -i "$PEM_PATH" docker-compose.yml "$EC2_USER@$EC2_IP:/home/ec2-user/project-root/"

# EC2에서 Docker 이미지를 풀(pull)하고 Docker Compose 실행
echo "Running Docker Compose on EC2..."
ssh -i "$PEM_PATH" "$EC2_USER@$EC2_IP" << EOF
    cd /home/ec2-user/project-root/
    sudo docker-compose down
    sudo docker-compose pull $DOCKER_HUB_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG
    sudo docker-compose up -d
EOF

echo "Deployment complete"
