from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.test import APIClient

class BlogTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='Nimna', email='nimnasudarsan99@gmail.com', password='password123')
        self.client.login(username='Nimna', password='password123')

    def test_register(self):
        response = self.client.post(reverse('register'), data={
            'username': 'new_user', 'email': 'new_user@example.com', 'password': 'newpassword'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_blog(self):
        response = self.client.post(reverse('blog-list-create'), data={
            'title': 'Test Blog', 'content': 'This is a test blog.'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_blog(self):
        response = self.client.get(reverse('blog-detail', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
