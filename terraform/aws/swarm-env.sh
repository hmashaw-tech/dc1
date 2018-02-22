export ANSIBLE_HOST_KEY_CHECKING=False
export TF_VAR_swarm_ami_id=$(grep 'artifact,0,id' packer-ubuntu-docker.log | cut -d: -f2)
