from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework import generics
from .models import Blog
from .serializers import BlogSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

# User Registration View
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Login View (using Token Authentication)
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# Blog List and Create View (for listing blogs and creating a new blog)
# class BlogListCreateView(generics.ListCreateAPIView):
#     queryset = Blog.objects.all()
#     serializer_class = BlogSerializer
#     permission_classes = [IsAuthenticated]  # Only authenticated users can create blogs

#     def perform_create(self, serializer):
#         # Associate the current logged-in user as the author
#         serializer.save(author=self.request.user)

# # Blog Detail View (for retrieving, updating, or deleting a single blog)
# class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Blog.objects.all()
#     serializer_class = BlogSerializer
#     permission_classes = [IsAuthenticated]  # Only authenticated users can access the blog details

# # Blog Delete View (for deleting a blog by author)
# class BlogDeleteView(APIView):
#     def delete(self, request, pk):
#         blog = Blog.objects.get(id=pk)
#         if blog.author == request.user:
#             blog.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response({'error': 'You are not the author of this blog'}, status=status.HTTP_403_FORBIDDEN)


# class BlogViewSet(viewsets.ModelViewSet):
#     queryset = Blog.objects.all()
#     serializer_class = BlogSerializer
#     permission_classes = [IsAuthenticated]  # Only authenticated users can create blogs

#     def perform_create(self, serializer):
#         # Associate the current logged-in user as the author
#         serializer.save(author=self.request.user)


from rest_framework.permissions import IsAuthenticatedOrReadOnly

# class BlogViewSet(viewsets.ModelViewSet):
#     queryset = Blog.objects.all()
#     serializer_class = BlogSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]  # ✅ Allow read-only access to unauthenticated users

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)


from rest_framework.permissions import IsAuthenticatedOrReadOnly

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You do not have permission to delete this blog.")
        instance.delete()


        # In Django views.py
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({'id': request.user.id, 'username': request.user.username})
