from django.shortcuts import render
from .models import Post

def lista_posts(request):
    posts = Post.objects.all().order_by('-fecha_creacion')
    return render(request, 'core/lista_posts.html', {'posts': posts})
