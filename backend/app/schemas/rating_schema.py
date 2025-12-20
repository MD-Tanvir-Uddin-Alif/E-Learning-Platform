from pydantic import BaseModel
from typing import Optional, List

class RatingSchema(BaseModel):
    rating: int
    comment: Optional[str] = None