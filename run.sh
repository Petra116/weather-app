# Konténerizált formában használjuk a terraform-ot
alias terraform='docker run -it --rm -v "$PWD":/workspace -v /var/run/docker.sock:/var/run/docker.sock -w /workspace hashicorp/terraform:light'

# Inicializálás
terraform init

# Módosítások áttekintése (IaC leírat)
terraform plan

# Infrastruktúra felépítése
terraform apply

# Infrastruktúra leállítása
terraform destroy