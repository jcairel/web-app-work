from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.measure import D
from django.contrib.gis.geos import GEOSGeometry

from .models import Store

def get_nearby_stores_within(latitude: float, longitude: float, km: int=10, limit: int=None, srid: int=4326):
    coordinates = Point(longitude, latitude, srid=srid)

    # Annote adds column for distance from location to coordinates
    return Store.objects.annotate(
        distance=Distance("location", coordinates, geodetic=True)
            ).filter(location__dwithin=(coordinates, D(km=km))
            ).order_by('distance')[0:limit]
    

