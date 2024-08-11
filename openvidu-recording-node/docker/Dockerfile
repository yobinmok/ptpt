FROM node:16-alpine3.16

# Copy openvidu-recording-node
COPY . /opt/openvidu-recording-node

# Install openvidu-recording-node dependencies
RUN npm --prefix /opt/openvidu-recording-node/openvidu-recording-node install

WORKDIR /opt/openvidu-recording-node/openvidu-recording-node

RUN ls
# COPY docker/entrypoint.sh .

# ENTRYPOINT [ "./entrypoint.sh" ]
RUN chmod +x /path/to/container/docker/entrypoint.sh
ENTRYPOINT [ "docker/entrypoint.sh" ]