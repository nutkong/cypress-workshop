echo "DELETE ALL CONTAINERS..."
sudo docker rm -f $(sudo docker container ls -aq)

echo "STARTING MONGODB..."
sudo docker run --name mongodb -ditp 27017:27017 mongo:3.4

echo "STARTING EXPRESS..."
sudo docker image build -t conduit-bn -f ./backend.Dockerfile .
sudo docker container run -ditp 3000:3000 \
  -e MONGODB_URI=mongodb://$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongodb):27017 \
  -e SECRET=secret \
  --name conduit-bn \
  conduit-bn

echo "STARTING FRONTEND..."

sudo docker image build -t conduit-fn -f ./frontend.Dockerfile .
sudo docker container run -ditp 4100:80 \
  -e REACT_APP_APIENDPOINT=http://$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' conduit-bn):4100 \
  --name conduit-fn \
  conduit-fn
