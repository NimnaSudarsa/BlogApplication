from django.urls import path, include
# from . import views 
# from .views import BlogListCreateView, BlogDetailView, RegisterView, LoginView
from rest_framework.routers import DefaultRouter
from .views import *
router = DefaultRouter()
router.register(r'blogs', BlogViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # User registration endpoint
    path('login/', LoginView.as_view(), name='login'),  # User login endpoint
    # path('blogs/', BlogListCreateView.as_view(), name='blog-list-create'),  # List and create blog posts
    # path('blogs/<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),  # View individual blog post
     path('', include(router.urls)),
     path('user/', CurrentUserView.as_view(), name='current-user'),

]

