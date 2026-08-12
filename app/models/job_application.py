from django.db import models


class JobApplication(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    ]

    id = models.BigAutoField(primary_key=True)
    job = models.ForeignKey(
        "app.Job",
        on_delete=models.CASCADE,
        related_name="applications",
    )
    freelancer = models.ForeignKey(
        "app.FreelancerProfile",
        on_delete=models.CASCADE,
        related_name="applications",
    )
    proposal = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    def __str__(self):
        return f"{self.freelancer} - {self.job}"