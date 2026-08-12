from django.db import models


class Portfolio(models.Model):
    id = models.BigAutoField(primary_key=True)

    freelancer = models.ForeignKey(
        "app.FreelancerProfile",
        on_delete=models.CASCADE,
        related_name="portfolios",
    )

    project_title = models.CharField(max_length=200)
    description = models.TextField()
    media_url = models.URLField()

    def __str__(self):
        return self.project_title