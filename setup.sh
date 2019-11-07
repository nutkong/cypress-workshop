echo "DELETE ALL DEPENDENCIES..."
sudo docker container rm -f $(sudo docker container ls -aq)
sudo docker network rm conduit-network

echo "CREATING NETWORK CUSTOM..."
sudo docker network create conduit-network

echo "STARTING MONGODB..."
sudo docker run --name mongodb -ditp 27017:27017 mongo:3.4

echo "STARTING EXPRESS..."
sudo docker image build -t conduit-bn -f ./backend.Dockerfile .
sudo docker container run -ditp 3000:3000 \
  -e MONGODB_URI=mongodb://$(curl http://ip4.me 2>/dev/null | sed -e 's#<[^>]*>##g' | grep '^[0-9]'):27017 \
  -e SECRET=secret \
  --name conduit-bn \
  conduit-bn

echo "STARTING FRONTEND..."
sudo docker image build \
  -t conduit-fn \
  -f ./frontend.Dockerfile \
  --build-arg api_endpoint=http://$(curl http://ip4.me 2>/dev/null | sed -e 's#<[^>]*>##g' | grep '^[0-9]'):3000/api \
  .
sudo docker container run -ditp 4100:80 \
  --name conduit-fn \
  conduit-fn

echo "ATTACH CONTAINER TO NETWORK..."
sudo docker network connect conduit-network conduit-bn 
sudo docker network connect conduit-network conduit-fn 
