FROM node:7.10

ENV HOME=/home/node

COPY package.json     $HOME/react-pager/
COPY yarn.lock        $HOME/react-pager/
RUN chown -R node:node $HOME/*

USER node
WORKDIR $HOME/react-pager/
RUN yarn install

