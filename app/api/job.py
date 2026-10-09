from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from app.models import Job, CreatorProfile


@api_view(["POST"])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def create_job(request):
    print("AUTHENTICATED:", request.user.is_authenticated)
    print("USER:", request.user)

    title = request.data.get("title")
    description = request.data.get("description")
    budget = request.data.get("budget")
    deadline = request.data.get("deadline")

    if not title or not description or not budget or not deadline:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "title, description, budget and deadline are required",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    if request.user.role != "creator":
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Only creators can create jobs",
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        creator_profile = CreatorProfile.objects.get(user=request.user)

        job = Job.objects.create(
            creator=creator_profile,
            title=title,
            description=description,
            budget=budget,
            deadline=deadline,
        )

        return Response(
            {
                "success": True,
                "data": {
                    "id": job.id,
                    "title": job.title,
                    "description": job.description,
                    "budget": str(job.budget),
                    "deadline": str(job.deadline),
                    "status": job.status,
                },
                "message": "Job created successfully",
            },
            status=status.HTTP_201_CREATED,
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


@api_view(["GET"])
@authentication_classes([SessionAuthentication])
@permission_classes([AllowAny])
def list_jobs(request):
    jobs = Job.objects.all().order_by("-id")

    data = []

    for job in jobs:
        data.append(
            {
                "id": job.id,
                "title": job.title,
                "description": job.description,
                "budget": str(job.budget),
                "deadline": str(job.deadline),
                "status": job.status,
                "creator": job.creator.company_name,
            }
        )

    return Response(
        {
            "success": True,
            "data": data,
            "message": "Jobs retrieved successfully",
        },
        status=status.HTTP_200_OK,
    )