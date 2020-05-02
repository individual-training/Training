pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm --version'
                sh 'npm install'
                sh 'npm run build '
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
