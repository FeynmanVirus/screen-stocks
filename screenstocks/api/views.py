from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
import yfinance as yf
from django.core import serializers
from json import loads, dumps

# Create your views here.

@api_view(['GET'])
def balance_sheet(request, ticker):
    data = yf.Ticker(ticker)
    balance_sheet = data.balance_sheet.to_json(orient="table")
    balance_sheet = loads(balance_sheet)
    return Response(balance_sheet)

@api_view(['GET'])
def incm_stmt(request, ticker):
    data = yf.Ticker(ticker)
    income_statement = data.income_stmt.to_json(orient="table")
    income_statement = loads(income_statement)
    return Response(income_statement)

@api_view(['GET'])
def cashflow(request, ticker):
    data = yf.Ticker(ticker)
    cashflow = data.cashflow.to_json(orient="table")
    cashflow = loads(cashflow)
    return Response(cashflow)