from django.urls import path
from . import views

urlpatterns = [
    path("api/bal_sheet/<str:ticker>", views.balance_sheet, name="bal_sheet"),
    path("api/incm_stmt/<str:ticker>", views.incm_stmt, name="incm_stmt"),
    path("api/cashflow/<str:ticker>", views.cashflow, name="cashflow"),
    path("api/lookup/<str:company_name>", views.stock_lookup, name="lookup")
]