# CI/CD Pipeline for Application Deployment using Jenkins

This repository contains the code and configurations for setting up a CI/CD pipeline using Jenkins to deploy an application. The pipeline involves building a Docker image, pushing it to Docker Hub, and deploying it to a server.

## Prerequisites

- Jenkins installed and running.
- Docker installed on the Jenkins server.
- GitHub repository containing the application code.

## Steps to Set Up the CI/CD Pipeline

1. **Configure Jenkins Credentials**
   - In Jenkins, navigate to "Manage Jenkins" > "Manage Credentials".
   - Add credentials for your GitHub account and Docker Hub account with appropriate permissions.

2. **Create Jenkins Pipeline**
   - In Jenkins, create a new pipeline project.
   - Configure the pipeline to use the Jenkinsfile provided in this repository.

3. **Configure GitHub Webhook**
   - In your GitHub repository settings, set up a webhook to trigger the Jenkins pipeline on code push events.

4. **Write Jenkinsfile**
   - The Jenkinsfile in this repository contains the pipeline configuration with stages for build and deployment.
   - Customize the Jenkinsfile to match your specific application and Docker image details.

5. **Dockerfile**
   - The Dockerfile in the "App/Backend" directory specifies the configuration for building the Docker image.
   - Ensure that the Dockerfile is properly set up for your application.

6. **Install Jenkins Plugins**
   - Ensure that the necessary Jenkins plugins are installed, including Git plugin and Docker plugin.

7. **Fix Docker Login Error**
   - We encountered an error during the build process related to Docker login. To fix it, use a personal access token for Docker login instead of using the password directly. Update the Jenkinsfile accordingly.

8. **Troubleshooting**
   - If you encounter any issues during the pipeline setup, refer to the "Troubleshooting" section in the Jenkins documentation provided in the pipeline.

## Deployment Process

1. When code is pushed to the GitHub repository, the GitHub webhook triggers the Jenkins pipeline.

2. The pipeline starts with the "Build" stage:
   - Jenkins fetches the code from the GitHub repository.
   - The Docker image is built using the Dockerfile in the "App/Backend" directory.
   - The built image is pushed to Docker Hub using the provided Docker Hub credentials.

3. The pipeline then proceeds to the "Deploy" stage:
   - The Docker image is pulled from Docker Hub to the deployment server.
   - The application is deployed and made accessible through the server's exposed port.

## Result : 

<img width="1440" alt="Screenshot 2023-07-24 at 23 38 54" src="https://github.com/HuitingFENG/ProjectDevOps/assets/99510825/11b583b2-a69c-421d-a508-4e4b94e8f35a">
