from rest_framework import serializers
from .models import Wishlist

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = [
            'id', 'created_at', 'buyer', 'items', 
            'wishmaster', 'items', 'status', 'store'
        ]