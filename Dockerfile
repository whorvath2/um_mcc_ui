FROM python:3.11

# Set environment variables needed here
ENV VIRTUAL_ENV=".venv"
ENV PATH=$PATH:$VIRTUAL_ENV/bin
ENV GUID=1001
ENV UUID=1002
ENV SERVICE_HOME="/service/um_mcc_ui"
ENV NVM_DIR="$SERVICE_HOME/.nvm"

# Update the OS
RUN apt-get update
# Install needed components
RUN apt-get install -y nginx supervisor

RUN groupadd -g $GUID api-service \
    && useradd --no-log-init -d "$SERVICE_HOME" -s /bin/bash -u $UUID -g $GUID api-service

WORKDIR $SERVICE_HOME
COPY --chown=$UIID:$GUID . $SERVICE_HOME
COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisord.conf

# Install node and npm and build the UI project
RUN mkdir "$NVM_DIR" \
    && curl -o - https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | /bin/bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install node \
    && nvm use node\
    && npm update -g npm \
    && npm ci

# Create the Python virtual environment and build and install the um_mcc project
WORKDIR $SERVICE_HOME/um_mcc
RUN python -m venv $VIRTUAL_ENV \
    && $VIRTUAL_ENV/bin/python -m pip install --upgrade pip \
    && $VIRTUAL_ENV/bin/pip install setuptools build \
    && $VIRTUAL_ENV/bin/python -m build --wheel -o ./ \
    && $VIRTUAL_ENV/bin/pip install ./*.whl

# Install the react component
WORKDIR $SERVICE_HOME

EXPOSE 3000
ENTRYPOINT ["/usr/bin/supervisord", "-c", "$SERVICE_HOME/supervisord.conf"]
