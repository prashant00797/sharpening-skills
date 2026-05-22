"""Mock data for Q7 — Multi-Tool Sales Research Agent."""

# get_company_info(company_name) reads this. Keys are lowercase for easy lookup.
COMPANIES = {
    "infosys":    {"industry": "IT Services", "size": "large"},
    "tcs":        {"industry": "IT Services", "size": "large"},
    "razorpay":   {"industry": "Fintech",     "size": "medium"},
    "freshworks": {"industry": "SaaS",        "size": "medium"},
    "zluri":      {"industry": "SaaS",        "size": "small"},
}

# calculate_deal_value(company_size, product_tier) reads these two.
# Annual price per seat (USD), by product tier.
TIER_PRICE = {
    "basic":      120,
    "pro":        400,
    "enterprise": 900,
}

# Estimated seat count, by company size.
SIZE_SEATS = {
    "small":  50,
    "medium": 500,
    "large":  5000,
}
