from database import Base
from sqlalchemy import Column,Integer,String,Float
class Student(Base):
    __tablename__="students"
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String(30),nullable=False)
    email=Column(String(50),unique=True,nullable=False)
    age=Column(Integer,nullable=False)
    department=Column(String(50),nullable=False)
    year=Column(Integer,nullable=False)
    cgpa=Column(Float,nullable=False)