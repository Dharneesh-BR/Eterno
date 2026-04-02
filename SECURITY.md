# Security Policy

## Supported Versions

We provide security updates for the following versions of Svasam:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

We take security issues seriously and appreciate your efforts to responsibly disclose any vulnerabilities you find.

### How to Report a Security Vulnerability

1. **Do not** create a public GitHub issue for security vulnerabilities
2. Email your findings to [INSERT SECURITY EMAIL]
3. Include the following details:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Any proof-of-concept code or screenshots
   - Your contact information

### Our Commitment

- We will acknowledge receipt of your report within 48 hours
- We will keep you informed about the progress of the fix
- We will credit you in our security acknowledgments (unless you prefer to remain anonymous)

### Public Disclosure Process

1. Security report received and verified
2. Code audit begins; fixes prepared
3. Updates tested and verified
4. Security fix released to all supported versions
5. Public disclosure with full details (after allowing time for users to update)

## Secure Development Practices

- All code is peer-reviewed before being merged
- Dependencies are regularly updated and audited
- Security headers are implemented
- Regular security audits are performed
- Sensitive data is properly encrypted

## Dependency Security

We use the following tools to maintain security:

- `npm audit` for dependency scanning
- Dependabot for automated dependency updates
- Regular manual security reviews

## Data Protection

- All user data is encrypted in transit using TLS 1.2+
- Sensitive data is encrypted at rest
- Regular security training for all team members
- Principle of least privilege for all system access

## Incident Response

In case of a security incident, we will:

1. Acknowledge the incident
2. Investigate the root cause
3. Fix the vulnerability
4. Notify affected users if necessary
5. Release a security update
6. Document the incident and lessons learned

## Security Updates

We recommend that you always run the latest version of Svasam to ensure you have all security updates.

## Responsible Disclosure

We follow responsible disclosure practices. Please allow us reasonable time to address security issues before public disclosure.
