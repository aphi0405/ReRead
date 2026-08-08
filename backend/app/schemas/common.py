"""
Shared response schemas for consistent API responses.
"""

from typing import Any, Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class StandardResponse(BaseModel, Generic[T]):
    """Every endpoint returns this wrapper for consistency."""

    success: bool
    data: T | None = None
    message: str
