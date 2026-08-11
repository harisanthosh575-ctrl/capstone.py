from django.contrib.auth import login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from app.services.auth_service import register_user, login_user


@api_view(["POST"])
def signup(request):
    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")
    role = request.data.get("role")
    phone = request.data.get("phone", "")

    if not name or not email or not password or not role:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "name, email, password and role are required",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = register_user(
            name=name,
            email=email,
            password=password,
            role=role,
            phone=phone,
        )

        return Response(
            {
                "success": True,
                "data": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                },
                "message": "Registration successful",
            },
            status=status.HTTP_201_CREATED,
        )

    except ValueError as error:
        return Response(
            {
                "success": False,
                "data": None,
                "message": str(error),
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "email and password are required",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = login_user(email, password)

    if user is None:
        return Response(
            {
                "success": False,
                "data": None,
                "message": "Invalid email or password",
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )

    login(request, user)

    return Response(
        {
            "success": True,
            "data": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
            },
            "message": "Login successful",
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
def logout_view(request):
    logout(request)

    return Response(
        {
            "success": True,
            "data": None,
            "message": "Logout successful",
        },
        status=status.HTTP_200_OK,
    )