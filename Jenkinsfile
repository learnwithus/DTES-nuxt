pipeline {
    agent { label 'main' }
    options { disableConcurrentBuilds() }
    stages {
        stage('Build beta') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 14') {
                    sh '''
                        set -eu
                        tools=$(mktemp -d)
                        trap 'rm -rf "$tools"' EXIT
                        npm install --prefix "$tools" --no-package-lock --no-audit --no-fund node@24.22.2 npm@11.6.2
                        export PATH="$tools/node_modules/.bin:$PATH"
                        node --version
                        npm --version
                        npm ci
                        BETA_NOINDEX=true npm run generate
                        grep -q 'name="robots" content="noindex, nofollow"' .output/public/index.html
                    '''
                }
                sh 'test -s .output/public/index.html'
                dir('.output/public') {
                    stash name: 'website', includes: '**/*'
                }
            }
        }
        stage('Deploy beta') {
            agent { label 'vchlearn' }
            options { skipDefaultCheckout() }
            steps {
                dir('beta-dist') {
                    deleteDir()
                    unstash 'website'
                    sh '''
                        set -eu
                        destination=/home/vchlearn/beta.stigma.vchlearn.ca
                        test -d "$destination"
                        test "$(cd "$destination" && pwd -P)" = "$destination"
                        test -s index.html
                        rsync -a --delay-updates --delete-delay --exclude='cgi-bin' --exclude='.htaccess' --exclude='.well-known' ./ "$destination/"
                    '''
                }
            }
        }
    }
}
