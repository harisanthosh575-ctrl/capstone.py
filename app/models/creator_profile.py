from django.conf import settings
from django.db import models


class CreatorProfile(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="creator_profile",
    )
    company_name = models.CharField(max_length=150)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.company_name