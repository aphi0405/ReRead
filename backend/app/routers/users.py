"""
User management endpoints: profile, CRUD, check-username.
"""

import math
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.crud.user import (
    delete_user,
    get_user_by_id,
    get_users_paginated,
    get_user_by_username,
    update_user,
)
from app.db.session import get_db
from app.models.user import User
from app.schemas.common import StandardResponse
from app.schemas.user import (
    PaginatedUsersResponse,
    UserResponse,
    UserUpdateRequest,
    UsernameAvailableResponse,
)

router = APIRouter(tags=["Users"])


# --------------------------------------------------------------------------
# GET /me
# --------------------------------------------------------------------------

@router.get(
    "/me",
    response_model=StandardResponse[UserResponse],
)
async def get_my_profile(
    current_user: User = Depends(get_current_user),
) -> StandardResponse[UserResponse]:
    return StandardResponse(
        success=True,
        data=UserResponse.model_validate(current_user),
        message="Profile retrieved",
    )


# --------------------------------------------------------------------------
# GET /users
# --------------------------------------------------------------------------

@router.get(
    "/users",
    response_model=StandardResponse[PaginatedUsersResponse],
)
async def list_users(
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    db: AsyncSession = Depends(get_db),
) -> StandardResponse[PaginatedUsersResponse]:
    users, total = await get_users_paginated(db, page=page, limit=limit)
    total_pages = math.ceil(total / limit) if total > 0 else 0

    return StandardResponse(
        success=True,
        data=PaginatedUsersResponse(
            users=[UserResponse.model_validate(u) for u in users],
            total=total,
            page=page,
            limit=limit,
            total_pages=total_pages,
        ),
        message="Users retrieved",
    )


# --------------------------------------------------------------------------
# GET /users/{id}
# --------------------------------------------------------------------------

@router.get(
    "/users/{user_id}",
    response_model=StandardResponse[UserResponse],
)
async def get_user(
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
) -> StandardResponse[UserResponse]:
    user = await get_user_by_id(db, user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return StandardResponse(
        success=True,
        data=UserResponse.model_validate(user),
        message="User retrieved",
    )


# --------------------------------------------------------------------------
# PUT /users/{id}
# --------------------------------------------------------------------------

@router.put(
    "/users/{user_id}",
    response_model=StandardResponse[UserResponse],
)
async def update_user_profile(
    user_id: uuid.UUID,
    body: UserUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> StandardResponse[UserResponse]:
    # Only allow editing your own profile
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only edit your own profile",
        )

    updated = await update_user(
        db,
        current_user,
        display_name=body.display_name,
        avatar_url=body.avatar_url,
    )

    return StandardResponse(
        success=True,
        data=UserResponse.model_validate(updated),
        message="Profile updated",
    )


# --------------------------------------------------------------------------
# DELETE /users/{id}
# --------------------------------------------------------------------------

@router.delete(
    "/users/{user_id}",
    response_model=StandardResponse[None],
)
async def delete_user_account(
    user_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> StandardResponse[None]:
    # Only allow deleting your own account
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own account",
        )

    await delete_user(db, current_user)

    return StandardResponse(
        success=True,
        data=None,
        message="Account deleted successfully",
    )


# --------------------------------------------------------------------------
# GET /check-username/{name}
# --------------------------------------------------------------------------

@router.get(
    "/check-username/{name}",
    response_model=StandardResponse[UsernameAvailableResponse],
)
async def check_username(
    name: str,
    db: AsyncSession = Depends(get_db),
) -> StandardResponse[UsernameAvailableResponse]:
    existing = await get_user_by_username(db, name)

    return StandardResponse(
        success=True,
        data=UsernameAvailableResponse(
            username=name,
            available=existing is None,
        ),
        message="Username is available" if existing is None else "Username is already taken",
    )
