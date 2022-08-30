resource "aws_alb" "application_load_balancer" {
  name                       = "${local.prefix}-alb"
  load_balancer_type         = "application"
  internal                   = false
  subnets                    = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]
  security_groups            = [aws_security_group.alb_sg.id]
  enable_deletion_protection = false
  ip_address_type            = "ipv4"
  idle_timeout               = 300

  tags = merge(
    local.common_tags,
    tomap({ "Name" = "${local.prefix}-ALB" })
  )
}

resource "aws_alb_listener" "alb_https_listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = var.https_ssl_policy
  certificate_arn   = aws_acm_certificate_validation.cert_validation.certificate_arn

  depends_on = [
    aws_acm_certificate_validation.cert_validation
  ]

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.server_backend_tg.arn
  }
}

resource "aws_alb_listener" "alb_http_listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_alb_listener_rule" "alb_https_listener_rule" {
  listener_arn = aws_alb_listener.alb_http_listener.arn
  priority     = 100
  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.server_backend_tg.arn
  }

  condition {
    path_pattern {
      values = ["/*"]
    }
  }

}
