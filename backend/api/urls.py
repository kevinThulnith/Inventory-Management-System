from django.urls import path
from . import views

# !API urls
urlpatterns = [
  # Category urls
  path('categories/', views.CategoryListCreateView.as_view(), name='category-lc'),
  path('categories/<int:pk>/', views.CategoryRetrieveUpdateDestroyView.as_view() , name='category-rud'),
  # Supplier urls
  path('suppliers/', views.SupplierListCreateView.as_view(), name='supplier-lc'),
  path('suppliers/<int:pk>/', views.SupplierRetrieveUpdateDestroyView.as_view(), name='supplier-rud'),
  # Customer urls
  path('customers/', views.CustomerListCreateView.as_view(), name='customer-lc'),
  path('customers/<int:pk>/', views.CustomerRetrieveUpdateDestroyView.as_view(), name='customer-rud'),
  # Product urls
  path('products/', views.ProductCreateView.as_view(), name='product-lc'),
  path('products/all/', views.ProductListView.as_view(), name='product-all'),
  path('products/<int:pk>/', views.ProductRetrieveUpdateDestroyView.as_view(), name='product-rud'),
  # Sale urls
  path('sales/', views.SaleCreateView.as_view(), name='sale-lc'),
  path('sales/<int:pk>/', views.SaleRetrieveUpdateDestroyView.as_view(), name='sale-rud'),
  path('sales/items/', views.SaleItemListCreateView.as_view(), name='sale-item-lc'),
  path('sales/items/<int:pk>/', views.SaleItemRetrieveUpdateDestroyView.as_view(), name='sale-item-rud'),
  # Purchase urls
  path('purchases/', views.PurchaseCreateView.as_view(), name='purchase-lc'),
  path('purchases/<int:pk>/', views.PurchaseRetrieveUpdateDestroyView.as_view(), name='purchase-rud'),
  path('purchases/items/', views.PurchaseItemListCreateView.as_view(), name='purchase-item-lc'),
  path('purchases/items/<int:pk>/', views.PurchaseItemRetrieveUpdateDestroyView.as_view(), name='purchase-item-rud'),
]