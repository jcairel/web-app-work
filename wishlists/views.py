from rest_framework import viewsets
from rest_framework.response import Response
from .models import Wishlist
from .serializers import WishlistSerializer
from .services import create_wishlist
from .services import get_wishlists
from .services import update_wishlist

class WishlistView(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    # Runs on POST request to wishlists/
    def create(self, request):
        buyer = self.request.data.get('buyer')
        items = self.request.data.get('items')
        store = int(self.request.data.get('store'))

        wishlist = create_wishlist(buyer, items, store)
        wishlist_data = WishlistSerializer(wishlist, many=False)

        return Response(wishlist_data.data)
    
    def list(self, request):
        latitude = self.request.query_params.get('lat')
        longitude = self.request.query_params.get('lng')
        options = {}
        
        for key in ('buyer', 'wishmaster'):
            value = self.request.query_params.get(key)
            if value:
                options[key] = value

        wishlist = get_wishlists(
            float(latitude),
            float(longitude),
            options
        )

        wishlists_data = WishlistSerializer(wishlist, many=True)
        return Response(wishlists_data.data)
    
    def partial_update(self, request, pk):
        wishlist = update_wishlist(
            pk=pk,
            wishmaster=request.data.get('wishmaster'),
            status=request.data.get('status')
        )

        wishlist_data = WishlistSerializer(wishlist, many=False)
        return Response(wishlist_data.data)