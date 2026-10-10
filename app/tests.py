import json
from datetime import date

from django.test import Client, TestCase

from app.models import CreatorProfile, FreelancerProfile, Job, User


class CsrfApiTests(TestCase):
    def setUp(self):
        self.client = Client(enforce_csrf_checks=True)

    def get_csrf_token(self):
        response = self.client.get("/api/csrf/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("csrftoken", response.cookies)
        token = response.json()["csrfToken"]
        self.assertTrue(token)
        return token

    def post_json(self, path, data, csrf_token=None):
        headers = {}
        if csrf_token:
            headers["HTTP_X_CSRFTOKEN"] = csrf_token
        return self.client.post(
            path,
            data=json.dumps(data),
            content_type="application/json",
            **headers,
        )

    def create_user(self, email, role):
        user = User.objects.create_user(
            email=email,
            name=email,
            role=role,
            password="test-password-123",
        )
        if role == "creator":
            CreatorProfile.objects.create(
                user=user,
                company_name=email,
                bio="",
            )
        else:
            FreelancerProfile.objects.create(
                user=user,
                title="Freelancer",
                bio="",
                experience=0,
            )
        return user

    def test_signup_requires_csrf_token(self):
        payload = {
            "name": "New Creator",
            "email": "new-creator@example.com",
            "password": "test-password-123",
            "role": "creator",
        }

        self.assertEqual(self.post_json("/api/signup/", payload).status_code, 403)

        token = self.get_csrf_token()
        response = self.post_json("/api/signup/", payload, token)

        self.assertEqual(response.status_code, 201)

    def test_login_requires_csrf_token(self):
        user = self.create_user("creator@example.com", "creator")
        payload = {
            "email": "creator@example.com",
            "password": "test-password-123",
        }

        self.assertEqual(self.post_json("/api/login/", payload).status_code, 403)

        token = self.get_csrf_token()
        response = self.post_json("/api/login/", payload, token)

        self.assertEqual(response.status_code, 200)
        self.assertIn("sessionid", response.cookies)
        self.assertEqual(
            self.client.session["_auth_user_id"],
            str(user.pk),
        )

    def test_job_creation_requires_csrf_token_for_session_user(self):
        creator = self.create_user("creator@example.com", "creator")
        self.client.force_login(creator)
        payload = {
            "title": "Test job",
            "description": "Test description",
            "budget": "100.00",
            "deadline": date.today().isoformat(),
        }

        self.assertEqual(
            self.post_json("/api/jobs/create/", payload).status_code,
            403,
        )

        token = self.get_csrf_token()
        response = self.post_json("/api/jobs/create/", payload, token)

        self.assertEqual(response.status_code, 201)

    def test_job_application_requires_csrf_token_for_session_user(self):
        creator = self.create_user("creator@example.com", "creator")
        freelancer = self.create_user("freelancer@example.com", "freelancer")
        job = Job.objects.create(
            creator=creator.creator_profile,
            title="Test job",
            description="Test description",
            budget="100.00",
            deadline=date.today(),
        )
        self.client.force_login(freelancer)
        payload = {"proposal": "Test proposal"}
        path = f"/api/jobs/{job.id}/apply/"

        self.assertEqual(self.post_json(path, payload).status_code, 403)

        token = self.get_csrf_token()
        response = self.post_json(path, payload, token)

        self.assertEqual(response.status_code, 201)
