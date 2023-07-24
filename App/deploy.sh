echo "###### Deploying changes ######"

echo "------ Git pull ------"
cd /home/devops/devops-CI-S8-GRP1
git pull

echo "------ Removing old containers ------"
docker-compose -f App/docker-compose.yml down

echo "------ Building new containers ------"
docker-compose -f App/docker-compose.yml build

echo "------ Running new containers ------"
docker-compose -f App/docker-compose.yml up -d

echo "###### Deployed! ######"
