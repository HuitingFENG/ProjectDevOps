pipeline {
    agent any
    
    stages {
        stage('Install JDK and Jenkins') {
            steps {
                sh 'sudo apt-get update'
                sh 'sudo apt-get install -y openjdk-11-jre'
                sh 'curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null'
                sh 'echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null'
                sh 'sudo apt-get update'
                sh 'sudo apt-get install -y jenkins'
                sh 'sudo apt-get install -y nodejs npm'
            }
        }

        stage('Start Jenkins') {
            steps {
                sh 'sudo systemctl enable jenkins'
                sh 'sudo systemctl start jenkins'
            }
        }
    }
}
