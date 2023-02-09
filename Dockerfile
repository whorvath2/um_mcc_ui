FROM node:19.6.0

# Set environment variables needed here
ENV VIRTUAL_ENV=".venv"
ENV PATH=$PATH:$VIRTUAL_ENV/bin
ENV GUID=1001
ENV UUID=1002

# This is needed to update the OS' package manager so that the current version of node will be installed
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -

RUN apt-get -yq update \
    && apt-get -yq upgrade \
    && apt-get install -yq nginx supervisor\
    && npm --version

RUN groupadd -g $GUID api-service \
    && useradd --no-log-init -d "/service/um_mcc_ui" -s /bin/bash -u $UUID -g $GUID api-service

WORKDIR /service/um_mcc_ui
COPY --chown=$UIID:$GUID . /service/um_mcc_ui
COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisord.conf

RUN npm update -g npm \
    && npm ci

EXPOSE 3000
ENTRYPOINT ["/usr/bin/supervisord", "-c", "/service/um_mcc_ui/supervisord.conf"]
