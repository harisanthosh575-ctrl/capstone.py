from django.db import models


class Job(models.Model):
    STATUS_CHOICES = [
        ("open", "Open"),
        ("closed", "Closed"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
    ]

    id = models.BigAutoField(primary_key=True)
    creator = models.ForeignKey(
        "app.CreatorProfile",
        on_delete=models.CASCADE,
        related_name="jobs",
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    deadline = models.DateField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="open",
    )

    def __str__(self):
        return self.title