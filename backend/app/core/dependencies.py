"""
FastAPI dependencies for authentication.
"""

import uuid

from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import decode_access_token
from app.crud.user import get_user_by_id
from app.db.session import get_db
from app.models.user import User

# Use HTTPBearer so Swagger UI shows the "Authorize" button with Bearer token
_bearer_scheme = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    Decode the JWT from the Authorization header, look up the user,
    and return the User ORM instance. Raises 401 if anything is invalid.
    """
    token = credentials.credentials
    user_id_str = decode_access_token(token)

    if user_id_str is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    try:
        user_id = uuid.UUID(user_id_str)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    user = await get_user_by_id(db, user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user

async def get_current_user_optional(
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> User | None:
    """
    Like get_current_user, but doesn't raise exception if no token is provided.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
        
    token = auth_header.split(" ")[1]
    user_id_str = decode_access_token(token)

    if user_id_str is None:
        return None

    try:
        user_id = uuid.UUID(user_id_str)
    except ValueError:
        return None

    user = await get_user_by_id(db, user_id)
    return user

