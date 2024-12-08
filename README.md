# weather-app
Egy egyszerű NodeJS projekt a devops projekthez.

## Beüzemelés:
- Ha csak a kódot szeretnénk futtatni, ahhoz elegendő belépni a weather-app folderbe és a node server.js parancsot kiadni.
- A Jenkins futtatásához először létre kell hozni egy jenkins_home foldert, majd a következőket futtatni:
```bash
sudo docker run -it --rm -p 8080:8080 -p 50000:50000 -v ./jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```
Ennek leállítása után:
```bash
sudo docker build -t my-jenkins -f Dockerfile_jenkins .
```
```bash
sudo docker run -it --name my-jenkins -p 8080:8080 -p 50000:50000 -v ./jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock my-jenkins
```

Ezután a Jenkins a localhost:8080-on lesz elérhető, ahol a megszokott módon lehet belépni. 
A buildeléshez szükséges config-ban a következőket kell beállítani:
- Source Code Management: None
- Build steps: Add steps: Execute Shell:
```bash
docker pull spirpetra/weather-app:latest
docker run --rm weather-app /bin/bash -c "git clone https://github.com/Petra116/weather-app.git && cd weather-app && node server.js"
```
Egy korábbi sikeres buildelés:
![](https://github.com/Petra116/weather-app/blob/main/SuccessfulBuild.png)
![](https://github.com/Petra116/weather-app/blob/main/Config.png)

- Nginx: Az Nginx config fájlja az nginx folderben található. Beüzemeléséhez egy docker-compose.yaml fájlt készítettem, így a weather-app folderen belül elegendő egy
```bash
docker compose up --build
```
parancsot kiadni. 

- A monitorozáshoz szerettem volna graylogot használni. A modules folderben két újabb mappa található: a graylog folder a tool-hoz szükséges main.tf és variables.tf fájlokat, míg a nodejs_app a program futtatásához szükséges main.tf és variables.tf fájlokat tartalmazza. Ezen kívül készült a root folderben egy main.tf, egy rsyslog.conf, egy run.sh, egy terraform.tfvars és egy variables.tf fájl is. Ennek beüzemeléséhez a következők kellenek:
```bash
terraform init
```
```bash
terraform apply
```
- A terraform init sikeresen lefut, viszont a terraform apply error-t dob, általam még meg nem fejtett okokból nem látja a ./modules/nodejs_app foldert, ami egyértelműen jelen van. (WSL-ben telepített terraform-mal próbálkoztam)

### Összefoglaló:
Használt (használni próbált) tool-ok:
- Git
- Docker és Docker compose
- Jenkins
- Nginx
- Terraform
- Graylog


###### Megjegyzés: Tudom, hogy sajnos nagyon kevés tool-t sikerült megvalósítanom, a sok féléves projekt közül sajnos ez lett az, amire a legkevesebb időm jutott. Ez lenne az utolsó félévem, tényleg csak épp átmenni szeretnék a tárgyból. 
