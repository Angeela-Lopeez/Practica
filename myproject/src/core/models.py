from django.db import models

class Post(models.Model):
    titulo = models.CharField(max_length=200)
    contenido = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    autor = models.CharField(max_length=100)

    def __str__(self):
        return self.titulo

