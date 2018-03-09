resource "aws_security_group" "dc1-docker" {

    name = "dc1-docker"
    description = "Security Group - DC1 Docker Swarm Servers"

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["${var.swarm_ingressIP}"]
    }

    ingress {
        from_port = 80
        to_port   = 80
        protocol  = "tcp"
        cidr_blocks = ["${var.swarm_ingressIP}"]
    }

    ingress {
        from_port = 443
        to_port   = 443
        protocol  = "tcp"
        cidr_blocks = ["${var.swarm_ingressIP}", "${var.gitIPs}"]
    }

    ingress {
        from_port = 8000
        to_port   = 8000
        protocol  = "tcp"
        cidr_blocks = ["${var.swarm_ingressIP}"]
    }

    ingress {
        from_port = 8080
        to_port   = 8080
        protocol  = "tcp"
        cidr_blocks = ["${var.swarm_ingressIP}"]
    }

    ingress {
        from_port = 2377
        to_port   = 2377
        protocol  = "tcp"
        self      = true
    }

    ingress {
        from_port = 7946
        to_port   = 7946
        protocol  = "tcp"
        self      = true
    }

    ingress {
        from_port = 7946
        to_port   = 7946
        protocol  = "udp"
        self      = true
    }

    ingress {
        from_port = 4789
        to_port   = 4789
        protocol  = "tcp"
        self      = true
    }

    ingress {
        from_port = 4789
        to_port   = 4789
        protocol  = "udp"
        self      = true
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

}

