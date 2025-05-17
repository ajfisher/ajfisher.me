# Codex Contributor Guide for `infra/`

Terraform code for the deployment lives here.

## Development

- Use Terraform >=1.9.2 as specified in `application/versions.tf`.
- Run `terraform fmt -recursive` and `terraform validate` before committing.
- Review changes with `terraform plan` against the appropriate workspace.
- Keep modules and resources well commented. Use descriptive variable names.

Following these guidelines helps keep infrastructure code reproducible and easy to maintain.
