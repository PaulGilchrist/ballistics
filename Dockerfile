# ng build --prod
# docker build --rm -f "Dockerfile" -t paulgilchrist/ballistics-react:latest .
# docker run -d -p 80:80 paulgilchrist/ballistics-react
# docker rm -f <containerID>
FROM nginx:alpine
LABEL author="Paul Gilchrist"
COPY ./build /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
# docker push paulgilchrist/ballistics-react