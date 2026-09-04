from pydantic import BaseModel,EmailStr,ConfigDict

class StudentCreate(BaseModel):
    name:str
    email:EmailStr
    age:int
    department:str
    year:int
    cgpa:float

class StudentResponse(BaseModel):
        id:int
        name:str
        email:EmailStr
        age:int
        department:str
        year:int
        cgpa:float
        model_config=ConfigDict(from_attributes=True)
