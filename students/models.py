from django.db import models


class Student(models.Model):
	STATUS_ACTIF = "actif"
	STATUS_SUSPENDU = "suspendu"
	STATUS_DIPLOME = "diplome"

	STATUS_CHOICES = [
		(STATUS_ACTIF, "Actif"),
		(STATUS_SUSPENDU, "Suspendu"),
		(STATUS_DIPLOME, "Diplome"),
	]

	first_name = models.CharField(max_length=100, verbose_name="Prenom")
	last_name = models.CharField(max_length=100, verbose_name="Nom")
	email = models.EmailField(unique=True)
	phone = models.CharField(max_length=20, blank=True)
	filiere = models.CharField(max_length=100)
	photo = models.ImageField(upload_to="photos/", blank=True, null=True)
	status = models.CharField(
		max_length=20,
		choices=STATUS_CHOICES,
		default=STATUS_ACTIF,
	)
	date_inscription = models.DateTimeField(auto_now_add=True)
	date_naissance = models.DateField(blank=True, null=True)

	class Meta:
		ordering = ["-date_inscription"]

	def __str__(self):
		return f"{self.last_name} {self.first_name}"
