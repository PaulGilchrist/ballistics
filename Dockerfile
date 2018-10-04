# docker build --rm -f "Dockerfile" -t paulgilchrist/ballistics:latest .
# docker run -d -p 80:3000 paulgilchrist/ballistics
# docker rm -f <containerID>
FROM paulgilchrist/node-web-server
COPY dist /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000
CMD [ "node", "index.js" ]
# docker push paulgilchrist/ballistics