# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx

# root 에 app 폴더를 생성 -> app 폴더 고정 -> admin 폴더 생성
RUN mkdir /app

WORKDIR /app

RUN mkdir ./cargo

# work dir 고정
WORKDIR /app/cargo

# work dir 에 build 폴더 생성 /app/admin/build
RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./build ./build

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 화주 페이지 3006 포트 오픈
EXPOSE 3011

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]