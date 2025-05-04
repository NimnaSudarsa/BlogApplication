from rest_framework import serializers
from .models import Blog
from django.contrib.auth.models import User

# class BlogSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Blog
#         fields = ['id', 'author', 'title', 'content', 'created_at']
#         read_only_fields = ['author']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Important

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email')
        )
        user.set_password(validated_data['password'])  # 🔐 Hash the password
        user.save()
        return user
    
    
class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)  # 🔁 Use nested serializer here
    # author = serializers.StringRelatedField()  # Shows the username of the author
    # author = serializers.PrimaryKeyRelatedField(read_only=True) 
    class Meta:
        model = Blog
        fields = ['id', 'author', 'title', 'content', 'created_at']
        read_only_fields = ['author']
