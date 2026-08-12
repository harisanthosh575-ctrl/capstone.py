from django.db import models


class Review(models.Model):
    id = models.BigAutoField(primary_key=True)

    job = models.ForeignKey(
        "app.Job",
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    creator = models.ForeignKey(
        "app.CreatorProfile",
        on_delete=models.CASCADE,
        related_name="reviews_given",
    )

    freelancer = models.ForeignKey(
        "app.FreelancerProfile",
        on_delete=models.CASCADE,
        related_name="reviews_received",
    )

    rating = models.PositiveIntegerField()
    review = models.TextField()

    def __str__(self):
        return f"Review for {self.job}"