from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from jose import jwt
from passlib.context import CryptContext

router = APIRouter()

SECRET_KEY = "truthlens_secret_key"

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# Request Model
class AuthRequest(BaseModel):

    email: str

    password: str

# Signup Route
@router.post("/signup")
def signup(data: AuthRequest):

    return {
        "message": "User created successfully"
    }

# Login Route
@router.post("/login")
def login(data: AuthRequest):

    token = jwt.encode(
        {
            "sub": data.email
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return {
        "access_token": token
    }