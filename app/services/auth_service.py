from django.contrib.auth import authenticate
from django.db import transaction

from app.models import User, CreatorProfile, FreelancerProfile


@transaction.atomic
def register_user(name, email, password, role, phone=""):
    """
    Create a marketplace user and the appropriate role profile.
    """

    if role not in ["creator", "freelancer"]:
        raise ValueError("Role must be creator or freelancer")

    if User.objects.filter(email=email).exists():
        raise ValueError("A user with this email already exists")

    user = User.objects.create_user(
        email=email,
        name=name,
        role=role,
        password=password,
        phone=phone,
    )

    if role == "creator":
        CreatorProfile.objects.create(
            user=user,
            company_name=name,
            bio="",
        )

    elif role == "freelancer":
        FreelancerProfile.objects.create(
            user=user,
            title="Freelancer",
            bio="",
            experience=0,
        )

    return user


def login_user(email, password):
    """
    Authenticate a user using email and password.
    """

    user = authenticate(
        username=email,
        password=password,
    )

    if user is not None:
        return user

    # Fallback for the custom email-based User model.
    try:
        user = User.objects.get(email=email)

        if user.check_password(password) and user.is_active:
            return user

    except User.DoesNotExist:
        pass

    return None