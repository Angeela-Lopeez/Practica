# views.py
from rest_framework import viewsets
from .models import Publicacion
from .serializers import PublicacionSerializer

class PublicacionViewSet(viewsets.ModelViewSet):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionSerializer
