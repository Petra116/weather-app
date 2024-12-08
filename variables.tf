# variables.tf
variable "project_name" {
  description = "A projekt neve, ami az erőforrások elnevezésében is megjelenik"
  type        = string
  default     = "nodejs-sample"
}

variable "environment" {
  description = "Környezet neve (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "app_port" {
  description = "Az alkalmazás portja"
  type        = number
  default     = 3000
}

variable "graylog_password_secret" {
  description = "Graylog password secret"
  type        = string
  sensitive   = true
}

variable "graylog_root_password_sha2" {
  description = "Graylog root jelszó SHA-256 hash-e"
  type        = string
  sensitive   = true
}