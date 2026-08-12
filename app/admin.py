from django.contrib import admin

from .models import (
    User,
    CreatorProfile,
    FreelancerProfile,
    Job,
    JobApplication,
    Portfolio,
    Review,
)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "name", "role", "phone", "is_active", "is_staff")
    list_filter = ("role", "is_active", "is_staff")
    search_fields = ("email", "name")


@admin.register(CreatorProfile)
class CreatorProfileAdmin(admin.ModelAdmin):
    list_display = ("company_name", "user")
    search_fields = ("company_name", "user__email")


@admin.register(FreelancerProfile)
class FreelancerProfileAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "experience")
    search_fields = ("title", "user__email")


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ("title", "creator", "budget", "deadline", "status")
    list_filter = ("status",)
    search_fields = ("title", "description")


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ("job", "freelancer", "status")
    list_filter = ("status",)
    search_fields = ("job__title", "proposal")


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ("project_title", "freelancer")
    search_fields = ("project_title", "description")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("job", "creator", "freelancer", "rating")
    list_filter = ("rating",)
    search_fields = ("review",)