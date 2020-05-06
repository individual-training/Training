pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deliver') {
            steps {
                sh 'set -x'
                sh 'npm start & sleep 1'
                sh 'echo $! > .pidfile'
                sh 'set +x'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'set -x'
                sh 'kill $(cat .pidfile)'
            }
        }
    }
}
