from rest_framework import serializers

from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "filiere",
            "photo",
            "status",
            "date_inscription",
            "date_naissance",
            "photo_url",
        ]

    def get_photo_url(self, obj):
        request = self.context.get("request")
        if not obj.photo or not request:
            return None
        return request.build_absolute_uri(obj.photo.url)
