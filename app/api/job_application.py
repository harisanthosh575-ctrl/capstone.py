from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from app.models import (
    Job,
    JobApplication,
    FreelancerProfile,
    CreatorProfile,
)


# ============================================================
# APPLY FOR A JOB
# ============================================================

@api_view(["POST"])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def apply_for_job(request, job_id):

    if request.user.role != "freelancer":
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Only freelancers can apply for jobs",
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    proposal = request.data.get("proposal")

    if not proposal:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Proposal is required",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        freelancer = FreelancerProfile.objects.get(
            user=request.user
        )
    except FreelancerProfile.DoesNotExist:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Freelancer profile not found",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Job not found",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    if JobApplication.objects.filter(
        job=job,
        freelancer=freelancer,
    ).exists():

        return Response(
            {
                "success": False,
                "data": None,
                "message": "You have already applied for this job",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    application = JobApplication.objects.create(
        job=job,
        freelancer=freelancer,
        proposal=proposal,
        status="pending",
    )

    return Response(
        {
            "success": True,
            "data": {
                "id": application.id,
                "job_id": job.id,
                "freelancer_id": freelancer.id,
                "proposal": application.proposal,
                "status": application.status,
            },
            "message": "Application submitted successfully",
        },
        status=status.HTTP_201_CREATED,
    )


# ============================================================
# LIST APPLICATIONS FOR A JOB
# ============================================================

@api_view(["GET"])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def list_job_applications(request, job_id):

    if request.user.role != "creator":
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Only creators can view job applications",
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        creator = CreatorProfile.objects.get(
            user=request.user
        )
    except CreatorProfile.DoesNotExist:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Creator profile not found",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    try:
        job = Job.objects.get(
            id=job_id,
            creator=creator,
        )
    except Job.DoesNotExist:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Job not found or you do not own this job",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    applications = JobApplication.objects.filter(
        job=job
    ).select_related("freelancer")

    data = []

    for application in applications:
        data.append(
            {
                "id": application.id,
                "job_id": application.job.id,
                "freelancer_id": application.freelancer.id,
                "proposal": application.proposal,
                "status": application.status,
            }
        )

    return Response(
        {
            "success": True,
            "data": data,
            "message": "Applications retrieved successfully",
        },
        status=status.HTTP_200_OK,
    )


# ============================================================
# ACCEPT APPLICATION
# ============================================================

@api_view(["POST"])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def accept_application(request, application_id):

    if request.user.role != "creator":
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Only creators can accept applications",
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        creator = CreatorProfile.objects.get(
            user=request.user
        )

        application = JobApplication.objects.select_related(
            "job"
        ).get(
            id=application_id,
            job__creator=creator,
        )

    except CreatorProfile.DoesNotExist:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Creator profile not found",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    except JobApplication.DoesNotExist:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Application not found",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    application.status = "accepted"
    application.save()

    return Response(
        {
            "success": True,
            "data": {
                "id": application.id,
                "job_id": application.job.id,
                "status": application.status,
            },
            "message": "Application accepted successfully",
        },
        status=status.HTTP_200_OK,
    )


# ============================================================
# REJECT APPLICATION
# ============================================================

@api_view(["POST"])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def reject_application(request, application_id):

    if request.user.role != "creator":
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Only creators can reject applications",
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        creator = CreatorProfile.objects.get(
            user=request.user
        )

        application = JobApplication.objects.select_related(
            "job"
        ).get(
            id=application_id,
            job__creator=creator,
        )

    except CreatorProfile.DoesNotExist:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Creator profile not found",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    except JobApplication.DoesNotExist:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Application not found",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    application.status = "rejected"
    application.save()

    return Response(
        {
            "success": True,
            "data": {
                "id": application.id,
                "job_id": application.job.id,
                "status": application.status,
            },
            "message": "Application rejected successfully",
        },
        status=status.HTTP_200_OK,
    )