import os
from pydantic_settings import BaseSettings
from typing import List

_backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_env_path = os.path.join(_backend_dir, ".env")

class Settings(BaseSettings):
    PROJECT_NAME: str = "TECH GALLERY 2027 API"
    VERSION: str = "1.0.0"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"
    DATABASE_URL: str = "sqlite:///./techgallery.db"
    
    # Supabase credentials (optional for SQLite standalone, used if provided)
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_JWT_SECRET: str = ""
    
    # Admin fallback auth
    ADMIN_EMAIL: str = "admin@techgallery2027.edu"
    ADMIN_PASSWORD: str = "admintech2027"
    JWT_SECRET: str = "techgallery2027_super_secure_jwt_secret_key_change_in_production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # College identity check
    OUR_COLLEGE_NAME: str = "LJCCA"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = (_env_path, ".env")
        extra = "allow"

settings = Settings()

