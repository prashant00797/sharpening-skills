from typing import Literal, Optional

from pydantic import BaseModel



class SentimentSchema(BaseModel):
    Review_Tag:Optional[Literal["positive","negative","neutral"]]
    one_line_summary:Optional[str]=""