resource "aws_instance" "swarm-manager" {
    count = "${var.swarm_managers}"
    ami = "${var.swarm_ami_id}"
    instance_type = "${var.swarm_instance_type}"
    
    vpc_security_group_ids = ["${aws_security_group.dc1-docker.id}"]

    key_name = "TF-Demo-Dev-Key"

    # How to connect for provisioning
    connection {
        user = "ubuntu"
        private_key = "${file("./keys/TF-Demo-Dev.key")}"
    }

    provisioner "remote-exec" {
        inline = [
        "if ${var.swarm_init}; then docker swarm init --advertise-addr ${self.private_ip}; fi",
        "if ! ${var.swarm_init}; then docker swarm join --token ${var.swarm_manager_token} --advertise-addr ${self.private_ip} ${var.swarm_manager_ip}:2377; fi"
        ]
    }

    tags {
        Name = "swarm-manager"
        Project = "${var.project-name}"
        Terraform = "true"
    }
}


resource "aws_instance" "swarm-worker" {
    count = "${var.swarm_workers}"
    ami = "${var.swarm_ami_id}"
    instance_type = "${var.swarm_instance_type}"

    vpc_security_group_ids = ["${aws_security_group.dc1-docker.id}"]

    key_name = "TF-Demo-Dev-Key"

    # How to connect for provisioning
    connection {
        user = "ubuntu"
        private_key = "${file("./keys/TF-Demo-Dev.key")}"
    }

    provisioner "remote-exec" {
        inline = [
        "echo \"docker swarm join --token ${var.swarm_worker_token} --advertise-addr ${self.private_ip} ${var.swarm_manager_ip}:2377\"",
        "docker swarm join --token ${var.swarm_worker_token} --advertise-addr ${self.private_ip} ${var.swarm_manager_ip}:2377"
        ]
    }

    tags {
        Name = "swarm-worker"
        Project = "${var.project-name}"
        Terraform = "true"
    }
}


output "swarm_manager_1_public_ip" {
  value = "${aws_instance.swarm-manager.0.public_ip}"
}

output "swarm_manager_1_private_ip" {
  value = "${aws_instance.swarm-manager.0.private_ip}"
}

/*
output "swarm_manager_2_public_ip" {
  value = "${aws_instance.swarm-manager.1.public_ip}"
}

output "swarm_manager_2_private_ip" {
  value = "${aws_instance.swarm-manager.1.private_ip}"
}

output "swarm_manager_3_public_ip" {
  value = "${aws_instance.swarm-manager.2.public_ip}"
}

output "swarm_manager_3_private_ip" {
  value = "${aws_instance.swarm-manager.2.private_ip}"
}
*/
