import json

from langchain_core.tools import tool
from .mock_data import catalog


@tool
def get_product(query:str):
    '''
    Use this whenever the customer asks about a product.
    Key details to mention are - 
    - product name,
    - product price,
    - in_stock avalaibility
    If any product is not present in the list return as no product matched.
    '''
    result = [product for product in catalog if query.lower() in product["product_name"].lower()]
    
    if not result:
        return "No product found"
    return json.dumps(result)
