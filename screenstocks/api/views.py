from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
import yfinance as yf
from django.core import serializers
from json import loads, dumps
import requests

# Create your views here.

@api_view(['GET'])
def balance_sheet(request, ticker):
    try:
        data = yf.Ticker(ticker)
        balance_sheet = data.balance_sheet.to_json(orient="table")
        balance_sheet = loads(balance_sheet)
        return Response(balance_sheet)
    except:
        return Response([])

@api_view(['GET'])
def incm_stmt(request, ticker):
    try:
        data = yf.Ticker(ticker)
        income_statement = data.income_stmt.to_json(orient="table")
        income_statement = loads(income_statement)
        return Response(income_statement)
    except: 
        return Response([])

@api_view(['GET'])
def cashflow(request, ticker):
    try:
        data = yf.Ticker(ticker)
        cashflow = data.cashflow.to_json(orient="table")
        cashflow = loads(cashflow)
        return Response(cashflow)
    except: 
        return Response([])

@api_view(['GET'])
def stock_lookup(request, company_name):
    if company_name == '':
        return Response([])
    yfinance = "https://query2.finance.yahoo.com/v1/finance/search"
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    params = {"q": company_name, "quotes_count": 1, "country": "India"}

    res = requests.get(url=yfinance, params=params, headers={'User-Agent': user_agent})
    data = res.json()

    company_code = data['quotes']
    return Response(company_code)