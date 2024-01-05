#----------------------------------------------------------------#
#----------------------for running at local----------------------#
docker run -it --entrypoint /bin/bash bitnami/kafka:latest

docker rm -f kafka

# for windows
docker run --name my-kafka --network my-network -p 9092:9092 `
-e KAFKA_ZOOKEEPER_CONNECT=my-zookeeper:2181 `
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://my-kafka:9092 `
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 `
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 `
-d wurstmeister/kafka

# for ubuntu & linux
docker run --name my-kafka --network my-network -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=my-zookeeper:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://my-kafka:9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
-d wurstmeister/kafka

docker run --name my-zookeeper --network my-network -p 2181:2181 -d wurstmeister/zookeeper

#add 1 new network named my-network
docker network create my-network
#add container name my-kafka to network my-network 
docker network connect my-network my-kafka 
docker network connect my-network my-zookeeper

#----------------------------------------------------------------#
#-------------------for ubuntu deployment------------------------#
#------------------at current project directory------------------#
sudo docker-compose build
sudo docker-compose up -d
