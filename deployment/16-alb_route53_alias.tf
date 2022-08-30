resource "aws_route53_record" "alb_dns_record" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.dev_api_server_domain
  type    = "A"

  alias {
    name                   = aws_alb.application_load_balancer.dns_name
    zone_id                = aws_alb.application_load_balancer.zone_id
    evaluate_target_health = false
  }

  depends_on = [
    aws_alb.application_load_balancer
  ]
}
