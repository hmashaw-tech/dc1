ssh -i keys/TF-Demo-Dev.key ubuntu@$(terraform output swarm_manager_1_public_ip)

