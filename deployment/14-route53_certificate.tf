resource "aws_acm_certificate" "dev_cert" {
  domain_name       = var.dev_api_server_domain
  validation_method = "DNS"

  tags = {
    "Name"      = local.prefix
    Environment = terraform.workspace
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation_record" {
  allow_overwrite = false
  ttl             = 60
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = tolist(aws_acm_certificate.dev_cert.domain_validation_options)[0].resource_record_name
  records         = [tolist(aws_acm_certificate.dev_cert.domain_validation_options)[0].resource_record_value]
  type            = tolist(aws_acm_certificate.dev_cert.domain_validation_options)[0].resource_record_type
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.dev_cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation_record.fqdn]
}
