## DC1
Datacenter 1

Automating Infrastructure deployment and utilizing CI/CD Pipelines

## Requirements:

* AWS Account
* Workstation with AWS CLI deployed
* Workstation with Terraform deployed
* Workstation with Ansible deployed

## Usage

* Create/Reuse a ssh key pair - current naming convention: TF-Demo-Dev.key / TF-Demo-Dev.pub.key
* Deploy public key to AWS
* In the terraform/aws diretory, create a folder named keys
* Deploy private key to keys folder
* Run terraform/aws/buildIt.sh script
* Run terraform/aws/ansible-run-playbook.sh script
* Connect to Docker swarm manager via terraform/aws/swarm-connect.sh script
* On swarm manager, run 'git clone https://github.com/hmashaw-tech/dc1.git'
* On swarm manager, run 'docker stack deploy -c docker-compose-cloud.yml demo'
* Demo application should now be available via <AWS public IP:8000/api>
* Docker swarm visualizer service is available on <AWS public IP:8080>

### Aditional automation pending for above steps

## Acknowledgments

demoApp and ninjaApp inspired by/cloned from [the-complete-developers-guide-to-mongodb](https://www.udemy.com/the-complete-developers-guide-to-mongodb).  Thanks to [Stephen Grider](https://github.com/StephenGrider).

Jenkins inspired by/cloned from [learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker](https://www.udemy.com/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker/).  Thanks to [Edward Viaene](https://github.com/wardviaene).

Terraform and Packer inspired by/cloned from [cloud-provisioning](https://github.com/vfarcic/cloud-provisioning).  Thanks to [Viktor Farcic](https://github.com/vfarcic).

Ansible Inventory inspired by/cloned from [Multi-Cloud Docker Swarm with Terraform and Ansible](https://solinea.com/blog/multi-cloud-docker-swarm-terraform-ansible).  Thanks to [Spencer Smith @solineainc](https://twitter.com/solineainc).

