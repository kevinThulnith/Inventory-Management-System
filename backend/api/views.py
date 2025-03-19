from .serializers import UserSerializer, CategorySerializer, SupplierSerializer, ProductSerializer, CustomerSerializer, SaleSerializer, SaleItemSerializer, PurchaseSerializer, PurchaseItemSerializer
from .models import Category, Supplier, Product, Customer, Sale, SaleItem, Purchase, PurchaseItem
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import generics
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

# !User views

# TODO: Create a view for creating a new user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
# TODO: To send user credentials to the frontend
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated] # !Only authenticated users can access this view
    serializer_class = UserSerializer
    
    def get(self, request):
        user = request.user
        return Response({'username': user.username,'email': user.email})
    
# !Category views

# TODO: Create | Update | Delete | Get Category
class CatagoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    
class CatagoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    
# !Supplier views

# TODO: Create | Update | Delete | Get Supplier
class SupplierListCreateView(generics.ListCreateAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAuthenticated]
    
class SupplierRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAuthenticated]
    
# !Customer views

# TODO: Create | Update | Delete | Get Customer
class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
    
class CustomerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]      
    
# !Product views

# TODO: Create | Update | Delete | Get Product
class ProductCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated] # !Only authenticated users can access this view
    
    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():   
            serializer.save(author=self.request.user)
        else :
            print(serializer.errors)
            
class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated] # !Only authenticated users can access this view
    
    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(author=user)
    
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
# !Sale views

# TODO: Create | Update | Delete | Get Sale
class SaleCreateView(generics.ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = [IsAuthenticated]
    
class SaleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = [IsAuthenticated]
    
# !Sale Item views

# TODO: Create | Update | Delete | Get Sale Item
class SaleItemListCreateView(generics.ListCreateAPIView):
    queryset = SaleItem.objects.all()
    serializer_class = SaleItemSerializer
    permission_classes = [IsAuthenticated]

class SaleItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SaleItem.objects.all()
    serializer_class = SaleItemSerializer
    permission_classes = [IsAuthenticated]
    
# !Purchase views

# TODO: Create | Update | Delete | Get Purchase
class PurchaseCreateView(generics.ListCreateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated]
    
class PurchaseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated]
    
# !Purchase Item views

# TODO: Create | Update | Delete | Get Purchase Item
class PurchaseItemListCreateView(generics.ListCreateAPIView):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    permission_classes = [IsAuthenticated]
    
class PurchaseItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    permission_classes = [IsAuthenticated]    