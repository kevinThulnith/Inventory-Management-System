from .models import Category, Supplier, Product, Customer, Sale, SaleItem, Purchase, PurchaseItem
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
      
class CategorySerializer(serializers.ModelSerializer):
    # TODO: Get the number of products in a category
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_product_count(self, obj):
        return Product.objects.filter(productCategory=obj).count()

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'
  
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {'author': {'read_only': True}}
        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
        
class SaleSerializer(serializers.ModelSerializer):
    # TODO: Get the customer name
    customer_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Sale
        fields = '__all__'
        extra_kwargs = {'total': {'read_only': True}}
        
    def get_customer_name(self, obj):
        return obj.customer.name if obj.customer else None  
          
class SaleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleItem
        fields = '__all__'
        
class PurchaseSerializer(serializers.ModelSerializer):
    # TODO: Get the supplier name
    supplier_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Purchase
        fields = '__all__'
        extra_kwargs = {'total': {'read_only': True}}
        
    def get_supplier_name(self, obj):
        return obj.supplier.name if obj.supplier else None        

class PurchaseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseItem
        fields = '__all__'