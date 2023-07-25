pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-hub-credentials')
        GIT_REPO_URL = 'https://github.com/HuitingFENG/ProjectDevOps.git'
        DOCKER_IMAGE_NAME = 'saber69/devopsproject'
        DOCKER_IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from the Git repository
                git branch: 'main', url: GIT_REPO_URL
            }
        }

        stage('Build') {
            steps {
                // Build your application here
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                // Run tests for your application here
                sh 'npm test'
            }
        }

        stage('Dockerize') {
            steps {
                // Build the Docker image using the Dockerfile in the application directory
                sh "docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Log in to Docker Hub
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_REGISTRY_PASSWORD', usernameVariable: 'DOCKER_REGISTRY_USERNAME')]) {
                    sh "docker login -u ${DOCKER_REGISTRY_USERNAME} -p ${DOCKER_REGISTRY_PASSWORD}"
                }

                // Push the Docker image to Docker Hub
                sh "docker push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
            }
        }
    }

    post {
        always {
            // Clean up after the build, e.g., remove temporary Docker containers or volumes
            dockerNode {
                // The `docker system prune -af` command will be executed inside the Docker container
                sh "docker system prune -af"
            }
        }
        success {
            echo 'Build successful! Deploy your application.'
        }
        failure {
            echo 'Build failed! Check the logs for errors.'
        }
    }
}
