from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from app.models import Portfolio, FreelancerProfile


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return


# ============================================================
# CREATE PORTFOLIO
# ============================================================

@api_view(["POST"])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([IsAuthenticated])
def create_portfolio(request):

    if request.user.role != "freelancer":
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Only freelancers can create portfolio items",
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    project_title = request.data.get("project_title")
    description = request.data.get("description")
    media_url = request.data.get("media_url")

    if not project_title or not description or not media_url:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "project_title, description and media_url are required",
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

    portfolio = Portfolio.objects.create(
        freelancer=freelancer,
        project_title=project_title,
        description=description,
        media_url=media_url,
    )

    return Response(
        {
            "success": True,
            "data": {
                "id": portfolio.id,
                "project_title": portfolio.project_title,
                "description": portfolio.description,
                "media_url": portfolio.media_url,
            },
            "message": "Portfolio created successfully",
        },
        status=status.HTTP_201_CREATED,
    )


# ============================================================
# LIST MY PORTFOLIO
# ============================================================

@api_view(["GET"])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def list_my_portfolio(request):

    if request.user.role != "freelancer":
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Only freelancers can view their portfolio",
            },
            status=status.HTTP_403_FORBIDDEN,
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

    portfolios = Portfolio.objects.filter(
        freelancer=freelancer
    ).order_by("-id")

    data = []

    for portfolio in portfolios:
        data.append(
            {
                "id": portfolio.id,
                "project_title": portfolio.project_title,
                "description": portfolio.description,
                "media_url": portfolio.media_url,
            }
        )

    return Response(
        {
            "success": True,
            "data": data,
            "message": "Portfolio retrieved successfully",
        },
        status=status.HTTP_200_OK,
    )