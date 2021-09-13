pipeline{

  agent any

  environment {
    URIS_DATA_BASE = 'jdbc:oracle:thin:@10.218.44.37:1521:FFMDEV'
    USER_DATA_BASE = 'FFMOWNER'
    PASS_DATA_BASE = 'vtq_F6CPa'
    JWTSEG_SECRET = 'Totalplay31032021!'
    BROKER_KAFKA = '10.218.44.327:9092,10.218.44.5:9092,10.218.44.46:9092'
    HOST_APIGEE	= 'https://totalplay-dev.apigee.net'
    HOST_KB_ENG	= 'http://94.74.70.52'
    HOST_SOA_TP	= 'http://10.216.47.89:80'
    AES_KEY_VALUES = 'TotalplayAES2021_32442'
  }

  stages {
    stage('Descarga de codigo') {
      steps {
        echo 'Download code'
        git(
          url: 'http://totalplay.dev-ops.git/git/BSS_FFM.git',
          branch: 'feature',
          credentialsId: '010ac9a0-c1cb-4a39-b654-44d0fb886eeb',
          poll: true
        )
      }
    }

    stage('Construccion de codigo') {
      steps {
        echo 'Starting compilation'
        configFileProvider([configFile(fileId: 'e2c50185-d5ad-4416-b374-9122cf4263b3', variable: 'MAVEN_SETTINGS_XML')]) {
          withMaven(maven: 'maven') {
            sh 'mvn -f pom.xml -s $MAVEN_SETTINGS_XML clean compile -DskipTests'
          }
        }
        echo 'Build completion'
      }
    }

    stage('Pruebas unitarias') {
      steps {
        echo 'Staring testing process'
        withMaven(maven: 'maven') {
          sh 'mvn -f pom.xml test'
        }

        echo 'Ending compilation process'
      }
    }

    stage('Generación de reporte') {
      steps {
        echo 'Creating unit test results report'
        jacoco(
          sourcePattern: '**/src/main/java',
          sourceInclusionPattern: '**/*.java,**/*.groovy,**/*.kt,**/*.kts',
          sourceExclusionPattern: '**/test/**/*.java,**/target/**/*.java,**/config/*Config.java,**/dto/*Mapper.java,**/mapper/*Mapper.java,**/models/dto/*,**/models/entity/*',
          classPattern: '**/target/classes',
          execPattern: '**/target/**/*.exec',
          exclusionPattern: '**/*Test*.class'
        )
      }
    }

    stage('Analisis de codigo Estatico') {
      steps {
        echo 'Performing static code analysis'
        script {
          env.scannerHome = tool name: 'Sonarqube', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        }
        withSonarQubeEnv(
          installationName: 'sonarqube',
          credentialsId: 'sonarqube'
        ) {

          sh '''${scannerHome}/bin/sonar-scanner \\
          -Dsonar.host.url=http://totalplay.dev-ops.sonarqube \\
          -Dproject.settings=$WORKSPACE/sonar-project.properties
          '''
        }
        waitForQualityGate(credentialsId: 'sonarqube', abortPipeline: false)
        echo 'Ending static code validation'
      }
    }

    stage('Empaquetado de imagen') {

      agent {
        node {
          label 'docker1'
        }
      }

      environment {
        registry = 'totalplay.dev-ops.io'
        repository = 'ffm_cloud_dev'
        hwregional = 'na-mexico-1'
        hwregistry = 'swr.na-mexico-1.myhuaweicloud.com'
        hworganization = 'amarello-dev'
        hwaccess = 'ANBDBGPHJ4QZKVYEEOM6'
        hwsecurity = 'ooxqU8wLT8Ud8BJCAybZuQv4UMuTKSGDinmjY4C'
        ggregistry = 'gcr.io'
        ggorganization = 'totalplay-ffm-core-dev'
        credentials = '903fa24f-9839-48b3-b8e6-e600e7945189'
        dockerImage = ''
        imagename= 'ffm-web'
      }

      tools {
        jdk 'Jdk'
      }

      steps {

        echo 'Compiling proyect'
        configFileProvider([configFile(fileId: 'e2c50185-d5ad-4416-b374-9122cf4263b3', variable: 'MAVEN_SETTINGS_XML')]) {
          withMaven(maven: 'maven') {
            //sh 'mvn -f pom.xml -s $MAVEN_SETTINGS_XML clean package spring-boot:repackage -DskipTests'
            sh 'mvn -f pom.xml -s $MAVEN_SETTINGS_XML clean package -DskipTests'
          }
        }

        echo 'Creating docker image'
        script {
          dockerImage = docker.build repository+"/"+imagename
          sh 'docker tag $repository/$imagename:latest $registry/$repository/$imagename:latest'
          sh 'docker tag $repository/$imagename:latest $registry/$repository/$imagename:${BUILD_NUMBER}'
          sh 'docker tag $repository/$imagename:latest $hwregistry/$hworganization/$imagename:latest'
          sh 'docker tag $repository/$imagename:latest $ggregistry/$ggorganization/$imagename:latest'

          /*echo "Pushing image To HCR"
          sh '''docker login -u ${hwregional}@${hwaccess} -p $(printf ANBDBGPHJ4QZKVYEEOM6 | openssl dgst -binary -sha256 -hmac wooxqU8wLT8Ud8BJCAybZuQv4UMuTKSGDinmjY4C | od -An -vtx1 | sed \'s/[ \\n]//g\' | sed \'N;s/\\n//\') ${hwregistry}'''
          sh 'docker push $hwregistry/$hworganization/$imagename:latest'
          sh 'docker logout'*/

          echo "Pushing image To GCR"
          sh "gcloud auth activate-service-account --key-file=/opt/totalplay-ffm-core-dev-4b24bcf8b136.json"
          sh "gcloud auth configure-docker"
          sh "docker push ${ggregistry}/${ggorganization}/${imagename}:latest"
        }

        echo 'Remove images from local registry'
        script {
          sh 'docker rmi $hwregistry/$hworganization/$imagename:latest'
          sh 'docker rmi $ggregistry/$ggorganization/$imagename:latest'
        }
      }
    }

    /*stage('Despliegue HW') {

      steps {
        script {
          echo 'Deploy to HW CCE'
          kubernetesDeploy(configs: "DeploymentHW.yaml", kubeconfigId: "hwffmms", deleteResource: true)
          kubernetesDeploy(configs: "DeploymentHW.yaml", kubeconfigId: "hwffmms")
        }
      }
    }*/

    stage('Despliegue GC') {

      agent {
        node {
          label 'docker1'
        }
      }

      steps {
         script {
          echo 'Deploy to GG KE'
          sh 'gcloud container clusters get-credentials cluster-ffm-dev --zone us-west2 --project totalplay-ffm-core-dev'
          sh 'kubectl apply -f DeploymentGC.yaml'
          sh 'kubectl rollout restart deploy ffm-web'
        }
      }
    }

    stage('Pruebas de integración / carga y rendimiento') {
      steps {
        echo 'Starting integration test'
        /*withMaven(maven: 'maven') {
          sh 'mvn -f pom.xml integration-test'
        }*/
        sh "sleep 10"
        echo 'Build completion'
      }
    }

    stage('Reporte de resultados') {
      steps {
        echo 'Creating integration test results report'
        //cucumber buildStatus: 'UNSTABLE', reportTitle: 'Orden trabajo', fileIncludePattern: 'reports/cucumber-default/**/*.json', trendsLimit: 10, classifications: [['key': 'Browser', 'value': 'Firefox']]
        sh "sleep 10"
      }
    }

    stage('Analisis de Seguridad') {

      agent {
        node {
          label 'master'
        }
      }

      steps {
        step([$class: 'CxScanBuilder', comment: '', credentialsId: 'CheckmarxGS', excludeFolders: '', excludeOpenSourceFolders: '', exclusionsSetting: 'global', failBuildOnNewResults: false, failBuildOnNewSeverity: 'HIGH', filterPattern: '''!**/_cvs/**/*, !**/.svn/**/*,   !**/.hg/**/*,   !**/.git/**/*,  !**/.bzr/**/*, !**/bin/**/*,
        !**/obj/**/*,  !**/backup/**/*, !**/.idea/**/*, !**/*.DS_Store, !**/*.ipr,     !**/*.iws,
        !**/*.bak,     !**/*.tmp,       !**/*.aac,      !**/*.aif,      !**/*.iff,     !**/*.m3u, !**/*.mid, !**/*.mp3,
        !**/*.mpa,     !**/*.ra,        !**/*.wav,      !**/*.wma,      !**/*.3g2,     !**/*.3gp, !**/*.asf, !**/*.asx,
        !**/*.avi,     !**/*.flv,       !**/*.mov,      !**/*.mp4,      !**/*.mpg,     !**/*.rm,  !**/*.swf, !**/*.vob,
        !**/*.wmv,     !**/*.bmp,       !**/*.gif,      !**/*.jpg,      !**/*.png,     !**/*.psd, !**/*.tif, !**/*.swf,
        !**/*.jar,     !**/*.zip,       !**/*.rar,      !**/*.exe,      !**/*.dll,     !**/*.pdb, !**/*.7z,  !**/*.gz,
        !**/*.tar.gz,  !**/*.tar,       !**/*.gz,       !**/*.ahtm,     !**/*.ahtml,   !**/*.fhtml, !**/*.hdm,
        !**/*.hdml,    !**/*.hsql,      !**/*.ht,       !**/*.hta,      !**/*.htc,     !**/*.htd, !**/*.war, !**/*.ear,
        !**/*.htmls,   !**/*.ihtml,     !**/*.mht,      !**/*.mhtm,     !**/*.mhtml,   !**/*.ssi, !**/*.stm,
        !**/*.stml,    !**/*.ttml,      !**/*.txn,      !**/*.xhtm,     !**/*.xhtml,   !**/*.class, !**/*.iml, !Checkmarx/Reports/*.*''', fullScanCycle: 10, groupId: '41', includeOpenSourceFolders: '', osaArchiveIncludePatterns: '*.zip, *.war, *.ear, *.tgz', osaInstallBeforeScan: false, password: '{AQAAABAAAAAQGRXTzgkDAohBWPkjVcs0KdxTN8DGUwQSvcVovs4jpRM=}', preset: '36', projectName: 'FFMMicroservicios', sastEnabled: true, serverUrl: 'https://10.64.248.39/', sourceEncoding: '1', useOwnServerCredentials: true, username: '', vulnerabilityThresholdResult: 'FAILURE', waitForResultsEnabled: true])
      }
    }

    stage('Versionamiento del componente'){

      agent {
        node {
          label 'docker1'
        }
      }

      environment {
        registry = 'totalplay.dev-ops.io'
        repository = 'ffm_cloud_dev'
        credentials = '903fa24f-9839-48b3-b8e6-e600e7945189'
        dockerImage = ''
        imagename= 'ffm-web'
      }
      steps {
        script {
          withCredentials([usernamePassword( credentialsId: credentials, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            sh "docker login ${registry} -u ${USERNAME} -p ${PASSWORD} "
            sh 'docker push $registry/$repository/$imagename:latest'
            sh 'docker push $registry/$repository/$imagename:${BUILD_NUMBER}'
            sh 'docker logout'
          }
        }

        echo 'Remove image from local registry'
        script {
          sh 'docker rmi $repository/$imagename:latest'
          sh 'docker rmi $registry/$repository/$imagename:latest'
          sh 'docker rmi $registry/$repository/$imagename:${BUILD_NUMBER}'
        }
      }
    }

  }
}