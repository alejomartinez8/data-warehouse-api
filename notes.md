## Docker

### download the image

> `docker pull mysql`

### run the container

> `docker run --name docker-mysql --network host -e MYSQL_ROOT_PASSWORD=password -d mysql`

#### specific port

> `docker run --rm --name=docker-mysql --env MYSQL_ROOT_PASSWORD=password --detach --publish 3306:3306 mysql`

- `--name` container name
- `--network` specify the network of container
- `-e` environment variable
- `-d` run detached #[image name] image name

### list docker containers running

> `docker ps -a`

### Download the image of phpmyadmin

> `docker pull phpmyadmin`

### Connect to database in the same network with phpmyadmin

> `docker run --name myadmin -d --link docker-mysql:db -p 8080:80 phpmyadmin`

### Usage with external server

> `docker run --name myadmin -d -e PMA_HOST=host -p 8080:80 phpmyadmin`
