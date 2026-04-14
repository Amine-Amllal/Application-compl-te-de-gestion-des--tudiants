import csv

from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser

from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
	queryset = Student.objects.all()
	serializer_class = StudentSerializer
	parser_classes = [MultiPartParser, FormParser, JSONParser]

	def get_serializer_context(self):
		return {"request": self.request}

	def get_queryset(self):
		qs = super().get_queryset()
		q = self.request.query_params.get("q", "")
		filiere = self.request.query_params.get("filiere", "")
		status = self.request.query_params.get("status", "")

		if q:
			qs = qs.filter(
				Q(first_name__icontains=q)
				| Q(last_name__icontains=q)
				| Q(email__icontains=q)
			)
		if filiere:
			qs = qs.filter(filiere__icontains=filiere)
		if status:
			qs = qs.filter(status=status)
		return qs


def export_students_csv(request):
	students = Student.objects.all()
	q = request.GET.get("q", "")
	filiere = request.GET.get("filiere", "")
	status = request.GET.get("status", "")

	if q:
		students = students.filter(
			Q(first_name__icontains=q) | Q(last_name__icontains=q) | Q(email__icontains=q)
		)
	if filiere:
		students = students.filter(filiere__icontains=filiere)
	if status:
		students = students.filter(status=status)

	response = HttpResponse(content_type="text/csv")
	response["Content-Disposition"] = 'attachment; filename="etudiants.csv"'

	writer = csv.writer(response)
	writer.writerow(
		[
			"Prenom",
			"Nom",
			"Email",
			"Telephone",
			"Filiere",
			"Statut",
			"Date inscription",
			"Date naissance",
		]
	)

	for student in students:
		writer.writerow(
			[
				student.first_name,
				student.last_name,
				student.email,
				student.phone,
				student.filiere,
				student.status,
				student.date_inscription.strftime("%Y-%m-%d %H:%M"),
				student.date_naissance or "",
			]
		)

	return response


def spa_view(request, path=None):
	return render(request, "index.html")
