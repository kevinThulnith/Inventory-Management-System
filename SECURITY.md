# Security Policy

## Supported Versions

The security fixes and maintenance efforts for this project currently target the latest commit on the default branch (`main` or `master`) and the dependencies specified in the `requirements.txt` file (Django==5.1.7, djangorestframework==3.15.2, djangorestframework_simplejwt==5.5.0, etc.).

Users are encouraged to use the versions specified in the latest `requirements.txt` and the code from the main branch to ensure they have the most up-to-date security patches that have been applied.

At this time, older versions or commits are not actively supported with security patches.

## Reporting a Vulnerability

We take the security of the Inventory Management System seriously. If you discover a security vulnerability, we appreciate your help in disclosing it to us privately and responsibly.

**Please do not open a public GitHub issue for security vulnerabilities.**

Instead, please attempt to contact the project maintainer directly (e.g., via a private message through their GitHub profile listed as the repository owner) or, if possible, utilize GitHub's private vulnerability reporting feature if it's enabled for this repository.

When reporting, please include the following information:

- A clear description of the vulnerability.
- Steps to reproduce the vulnerability.
- The specific code, branch, or commit affected.
- The potential impact of the vulnerability.

We will do our best to acknowledge your report promptly and work with you to understand and address the issue.

## Security Practices Implemented/Leveraged

Based on the project documentation (`README.md`), the following security features and practices are integrated into the system:

- **User Authentication:** Secure login/logout using **JWT Authentication** (`djangorestframework-simplejwt` dependency), ensuring only authenticated users can access protected resources (`/api/token/`, `/api/token/blacklist/`).
- **Authorization:** **Role-Based Access** is mentioned for protecting routes and endpoints, controlling what authenticated users can do based on their role.
- **CSRF Protection:** **CSRF protection** is implemented, utilizing Django's built-in middleware and custom handling for API requests including secure cookie handling and validation, as described in the README's configuration steps. The frontend explicitly sends the `X-CSRFToken` header (`django-cors-headers` likely aids in coordinating requests).
- **Secure Database Handling:** The project leverages Django's ORM with PostgreSQL (`psycopg2-binary`), which helps mitigate common database vulnerabilities like SQL Injection when used correctly.
- **Sensitive Data Management:** The `README.md` strongly recommends using **environment variables** (`python-dotenv` dependency is present) for sensitive information like database credentials and secret keys, explicitly warning against committing these to the repository.
- **Input Validation:** **User Registration** includes validation, a basic security measure against malformed data.
- **API Security:** API endpoints are protected and require `Authorization: Bearer <jwt-token>` headers for access.
- **CORS Management:** `django-cors-headers` is used, indicating attention to securing cross-origin requests between the frontend and backend.
- **Dependency Security:** While not listed as an explicit _implementation_ feature, relying on well-maintained libraries like Django, DRF, and `djangorestframework-simplejwt` from `requirements.txt` incorporates security practices and patches maintained by those communities. Users are encouraged to keep dependencies up-to-date.

We are committed to improving the security of this project and appreciate contributions that enhance its security posture.

---

_This Security Policy is based solely on the information provided in the project's README.md and requirements.txt files._
