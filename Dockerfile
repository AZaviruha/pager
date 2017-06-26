FROM node:7.10

EXPOSE 3077
ENV HOME=/home/node

COPY package.json     $HOME/react-pager/
RUN chown -R node:node $HOME/*

USER node
WORKDIR $HOME/react-pager/
#RUN yarn install

