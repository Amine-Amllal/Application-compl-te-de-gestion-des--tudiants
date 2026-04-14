from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
	list_display = (
		"last_name",
		"first_name",
		"email",
		"filiere",
		"status",
		"date_inscription",
	)
	search_fields = ("last_name", "first_name", "email", "filiere")
	list_filter = ("filiere", "status")
