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
                node {
                    // Set the label to "any" to run on any available agent
                    checkout scm
                }
            }
        }

        stage('Build') {
            steps {
                // Execute the 'npm install' command on a Jenkins agent that has access to the filesystem
                node {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                // Execute the 'npm test' command on a Jenkins agent that has access to the filesystem
                node {
                    sh 'npm test'
                }
            }
        }

        stage('Dockerize') {
            steps {
                // Execute the 'docker build' command on a Jenkins agent that has access to the filesystem
                node {
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Log in to Docker Hub
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_REGISTRY_PASSWORD', usernameVariable: 'DOCKER_REGISTRY_USERNAME')]) {
                    node {
                        sh "docker login -u ${DOCKER_REGISTRY_USERNAME} -p ${DOCKER_REGISTRY_PASSWORD}"
                    }
                }

                // Push the Docker image to Docker Hub
                node {
                    sh "docker push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                }
            }
        }
    }

    post {
        always {
            // Clean up after the build, e.g., remove temporary Docker containers or volumes
            node {
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
