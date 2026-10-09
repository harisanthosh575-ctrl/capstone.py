from django.urls import path

from .auth import csrf_token, signup, login_view, logout_view
from .job import create_job, list_jobs
from .job_application import (
    apply_for_job,
    list_job_applications,
    accept_application,
    reject_application,
)
from .portfolio import (
    create_portfolio,
    list_my_portfolio,
)


urlpatterns = [
    # Authentication
    path("csrf/", csrf_token, name="api-csrf-token"),
    path("signup/", signup, name="api-signup"),
    path("login/", login_view, name="api-login"),
    path("logout/", logout_view, name="api-logout"),

    # Jobs
    path(
        "jobs/create/",
        create_job,
        name="api-create-job",
    ),
    path(
        "jobs/",
        list_jobs,
        name="api-list-jobs",
    ),

    # Job Applications
    path(
        "jobs/<int:job_id>/apply/",
        apply_for_job,
        name="api-apply-job",
    ),
    path(
        "jobs/<int:job_id>/applications/",
        list_job_applications,
        name="api-list-job-applications",
    ),
    path(
        "applications/<int:application_id>/accept/",
        accept_application,
        name="api-accept-application",
    ),
    path(
        "applications/<int:application_id>/reject/",
        reject_application,
        name="api-reject-application",
    ),

    # Portfolio
    path(
        "portfolio/create/",
        create_portfolio,
        name="api-create-portfolio",
    ),
    path(
        "portfolio/",
        list_my_portfolio,
        name="api-list-portfolio",
    ),
]