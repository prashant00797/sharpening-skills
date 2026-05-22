from .data import COMPANIES,SIZE_SEATS,TIER_PRICE
from langchain_core.tools import tool

@tool
def get_company_info(company_name):
    """
    Look up a company's industry and size from the company database.

    Args:
        company_name: The name of the company to look up (e.g. "Infosys").

    Returns the company's industry and size (small, medium or large).
    """
    name = company_name.lower()
  
    for key in COMPANIES:
        if key in name:
            return COMPANIES[key]

    return f"No records found for {company_name}"
    


@tool
def calculate_deal_value(company_size, product_tier):
    """
    Estimate the annual deal value for a company size and product tier.

    Args:
        company_size: The company's size — "small", "medium" or "large".
        Must come from get_company_info tool result — do not guess it.
        product_tier: The product plan — "basic", "pro" or "enterprise".
        No Assumptions or guessing in product_tier too.
    Returns the estimated deal value in USD.
    """

    seats = SIZE_SEATS.get(company_size)
    if seats is None:
        return f"Unknow comapnay size: {company_size}"
    
    
    price = TIER_PRICE.get(product_tier)
    
    if price is None:
        return f"Unknown Product_tier :{product_tier}"
    
    return seats * price

