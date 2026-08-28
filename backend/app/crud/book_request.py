import uuid
from typing import Optional, Tuple
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.book_request import BookRequest
from app.schemas.book_request import BookRequestCreate

async def create_book_request(
    db: AsyncSession, *, owner_id: uuid.UUID, request_in: BookRequestCreate
) -> BookRequest:
    db_obj = BookRequest(
        title=request_in.title,
        author=request_in.author,
        description=request_in.description,
        owner_id=owner_id,
    )
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    
    # Eager load the owner relationship for response
    stmt = (
        select(BookRequest)
        .options(selectinload(BookRequest.owner))
        .where(BookRequest.id == db_obj.id)
    )
    result = await db.execute(stmt)
    return result.scalar_one()

async def get_book_requests_paginated(
    db: AsyncSession,
    *,
    page: int = 1,
    limit: int = 20,
    search: Optional[str] = None,
    owner_id: Optional[uuid.UUID] = None,
) -> Tuple[list[BookRequest], int]:
    stmt = select(BookRequest).options(selectinload(BookRequest.owner))
    count_stmt = select(func.count(BookRequest.id))

    if search:
        search_filter = (BookRequest.title.ilike(f"%{search}%")) | (
            BookRequest.author.ilike(f"%{search}%")
        )
        stmt = stmt.where(search_filter)
        count_stmt = count_stmt.where(search_filter)

    if owner_id:
        stmt = stmt.where(BookRequest.owner_id == owner_id)
        count_stmt = count_stmt.where(BookRequest.owner_id == owner_id)

    # Order by newest first
    stmt = stmt.order_by(BookRequest.created_at.desc())
    
    # Pagination
    offset = (page - 1) * limit
    stmt = stmt.offset(offset).limit(limit)

    total_count = await db.execute(count_stmt)
    total = total_count.scalar_one()

    result = await db.execute(stmt)
    requests = result.scalars().all()

    return list(requests), total

async def get_book_request_by_id(db: AsyncSession, request_id: uuid.UUID) -> Optional[BookRequest]:
    stmt = (
        select(BookRequest)
        .options(selectinload(BookRequest.owner))
        .where(BookRequest.id == request_id)
    )
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

async def delete_book_request(db: AsyncSession, db_obj: BookRequest) -> None:
    await db.delete(db_obj)
    await db.commit()
