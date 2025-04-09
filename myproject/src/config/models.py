# models.py
from django.db import models

class Publicacion(models.Model):
    titulo = models.CharField(max_length=100)
    contenido = models.TextField()

    def __str__(self):
        return self.titulo
