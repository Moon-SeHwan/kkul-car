pipeline {
  agent none
  
  options { skipDefaultCheckout(true) }
  stages {
    stage('Checkout repository') {
      agent any
      steps {
        checkout scm
      }
    }
    stage('Build') {
      agent any

      steps {
        sh 'npm install --legacy-peer-deps'
        sh 'npm run build' 
      }
    }
    stage('Docker build') {
      agent any
      steps {
        sh 'docker build -t kkul-cargo-test:latest .'
      }
    }
    stage('Docker run') {
      agent any
      steps {
        /*
        xargs
        파이프라인( | ) 다음에 오는 연결 구문
        
        --no-run-if-empty
        파이프라인 전 명령어가 빈 값이면 실행하지 않음
        */
        sh 'docker ps -f name=kkul-cargo-test -q | xargs --no-run-if-empty docker container stop'
        sh 'docker container ls -a -fname=kkul-cargo-test -q | xargs -r docker container rm'
        sh 'docker images -f "dangling=true" -q | xargs --no-run-if-empty docker rmi'
        sh 'docker run -d -p 3011:3011 --name kkul-cargo-test kkul-cargo-test:latest'
      }
    }
  }
}