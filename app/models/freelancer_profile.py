from django.conf import settings
from django.db import models


class FreelancerProfile(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="freelancer_profile",
    )
    title = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    experience = models.IntegerField(default=0)

    def __str__(self):
        return self.title