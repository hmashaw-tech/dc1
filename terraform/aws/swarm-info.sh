ansible all --forks=1 -i ansible-inventory --private-key=keys/TF-Demo-Dev.key -a "docker info"
