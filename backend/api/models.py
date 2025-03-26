from django.contrib.auth.models import User
from django.db import models

# !Create your models here.
class Category(models.Model):
    "Product Catagory model"
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Supplier(models.Model):
    "Supplier model"
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True, null=True, unique=True)
    email = models.EmailField(blank=True, null=True, unique=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
class Customer(models.Model):
    "Customer model"
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True, null=True, unique=True)
    email = models.EmailField(blank=True, null=True, unique=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    "Product model"
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    sellingPrice = models.DecimalField(max_digits=10, decimal_places=2)
    costPrice = models.DecimalField(max_digits=10, decimal_places=2)
    stockQuantity = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # !Foreign keys
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='autthor')
    productCategory = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='productCategory')

    def __str__(self):
        return self.name
    
class Sale(models.Model):
    "Sale model"
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer') # !Foreign key
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sale {self.id} - {self.sale_date}"
    
class SaleItem(models.Model):
    "Sale item model"
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='sale') # !Foreign key
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sale_items') # !Foreign key
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return f"{self.quantity} x {self.product.name} - {self.sale.id}"
    
    def save(self, *args, **kwargs):
        "Automatically set the price based on the product's selling price if not provided and update stock quantity and sale total"
        if not self.price:
            self.price = self.product.sellingPrice
        super().save(*args, **kwargs)
        # !Update the product's stock quantity
        self.product.stockQuantity -= self.quantity
        self.product.save()
        # !Update the sale's total
        self.sale.total += self.quantity * self.price
        self.sale.save()
        
class Purchase(models.Model):
    "Purchase model"
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name="supplier") # !Foreign key
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Purchase {self.id} - {self.purchase_date}"

class PurchaseItem(models.Model):
    "Purchase item model"
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE, related_name='purchase') # !Foreign key
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='purchase_items') # !Foreign key
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} - {self.purchase.id}"
    
    def save(self, *args, **kwargs):
        "Automatically set the price based on the product's selling price if not provided and update stock quantity and purchase total"
        if not self.price:
            self.price = self.product.costPrice
        super().save(*args, **kwargs)
        # !Update the product's stock quantity
        self.product.stockQuantity += self.quantity
        self.product.save()
        # !Update the purchase's total
        self.purchase.total += self.quantity * self.price
        self.purchase.save()