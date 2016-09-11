
all:
	docker build -t twenty_img .
	docker run -d --name twenty_cont -p 80:3000 twenty_img

clean:
	docker kill twenty_cont
	docker rm twenty_cont
	docker rmi twenty_img

