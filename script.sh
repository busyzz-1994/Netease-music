
###
 # @Author: busyzz
 # @Date: 2020-12-24 14:41:45
 # @Description:
###
#!/bin/bash
echo "构建镜像 - blog-music"
docker build -t blog-music:1.0.0 .
echo "删除旧容器 - blog-music"
docker stop blog-music-container
docker rm blog-music-container
echo "启动容器 - blog-music"
docker run -d -p 80:4000 --name blog-music-container blog-music:1.0.0