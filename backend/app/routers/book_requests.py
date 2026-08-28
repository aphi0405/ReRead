import math
import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user, get_current_user_optional
from app.crud.book_request import (
    create_book_request,
    delete_book_request,
    get_book_request_by_id,
    get_book_requests_paginated,
)
from app.db.session import get_db
from app.models.user import User
from app.schemas.book_request import (
    BookRequestCreate,
    BookRequestResponse,
    PaginatedBookRequestsResponse,
)
from app.schemas.common import StandardResponse

router = APIRouter(tags=["Book Requests"])

@router.get(
    "/requests",
    response_model=StandardResponse[PaginatedBookRequestsResponse],
)
async def list_book_requests(
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search by title or author"),
    mine: bool = Query(False, description="Show only my requests"),
    current_user: Optional[User] = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
) -> StandardResponse[PaginatedBookRequestsResponse]:
    
    owner_id = current_user.id if mine and current_user else None
    
    if mine and not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Must be logged in to view your requests",
        )

    requests, total = await get_book_requests_paginated(
        db, page=page, limit=limit, search=search, owner_id=owner_id
    )
    total_pages = math.ceil(total / limit) if total > 0 else 0

    return StandardResponse(
        success=True,
        data=PaginatedBookRequestsResponse(
            requests=[BookRequestResponse.model_validate(r) for r in requests],
            total=total,
            page=page,
            limit=limit,
            total_pages=total_pages,
        ),
        message="Book requests retrieved",
    )

@router.post(
    "/requests",
    response_model=StandardResponse[BookRequestResponse],
    status_code=status.HTTP_201_CREATED,
)
async def add_book_request(
    body: BookRequestCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> StandardResponse[BookRequestResponse]:
    request_obj = await create_book_request(db, owner_id=current_user.id, request_in=body)
    
    return StandardResponse(
        success=True,
        data=BookRequestResponse.model_validate(request_obj),
        message="Book request created successfully",
    )

@router.delete(
    "/requests/{request_id}",
    response_model=StandardResponse[None],
)
async def remove_book_request(
    request_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> StandardResponse[None]:
    request_obj = await get_book_request_by_id(db, request_id)
    if request_obj is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book request not found",
        )
        
    if request_obj.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own requests",
        )

    await delete_book_request(db, request_obj)

    return StandardResponse(
        success=True,
        data=None,
        message="Book request deleted successfully",
    )
