pipeline {
    agent {
        label 'main'
    }
    environment {

    }
    stages {
        stage('Verify Enviornment') {
            steps {
                script {
                    if (!env.SERVER_DEPLOY_DIRECTORY || env.SERVER_DEPLOY_DIRECTORY == '') {
                        error('Missing SERVER_DEPLOY_DIRECTORY')
                    }
                }
                sh 'printenv'
            }
        }
        stage('Build') {
            // do the actual build
            steps {
                nodejs(nodeJSInstallationName: 'Node 14') {
                    sh 'npm install'
                    sh 'npm run generate'
                }
                // stash the data
                dir('dist') {
                    stash name: "website", includes: "**/*"
                }
            }

        }
        stage('Deploy') {
            agent {
                label 'vchlearn'
            }
            options { skipDefaultCheckout() }
            steps {
                dir("/home/vchlearn/${SERVER_DEPLOY_DIRECTORY}") {
                    // Remove all previous deploy files
                    sh """find /home/vchlearn/${SERVER_DEPLOY_DIRECTORY} -maxdepth 1 -mindepth 1 -not -name "cgi-bin" -not -name ".htaccess" -not -name ".well-known" -exec rm -rf {} +"""
                    // Redeploy
                    unstash "website"
                }
            }

        }
    }

}