"""
URL configuration for blog_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from .views import *
# from drf_yasg import openapi
# from rest_framework import permissions

# API Documentation setup using drf-yasg
# schema_view = get_schema_view(
#     openapi.Info(
#         title="Blog API",
#         default_version='v1',
#         description="A simple blog API",
#         terms_of_service="https://www.google.com/policies/terms/",
#         contact=openapi.Contact(email="contact@blogapi.local"),
#         license=openapi.License(name="MIT"),
#     ),
#     public=True,
#     permission_classes=(permissions.AllowAny,),
# )

urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin
    path('api/', include('blog.urls')),  # Include the blog app's API URLs
    # path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),  # API docs at the root URL
]
