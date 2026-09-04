from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schema import StudentCreate,StudentResponse
from models import Student

router=APIRouter()

@router.post("/createstudent",response_model=StudentResponse)
def create_student(newstudent:StudentCreate,db:Session=Depends(get_db)):
    email=db.query(Student).filter(Student.email==newstudent.email).first()
    if email:
       raise HTTPException(
        status_code=400,
        detail="Email already exits"
       ) 
    student=Student(
        name=newstudent.name,
        email=newstudent.email,
        age=newstudent.age,
        department=newstudent.department,
        year=newstudent.year,
        cgpa=newstudent.cgpa)
    db.add(student)
    db.commit()
    db.refresh(student)
    return student

@router.get("/student",response_model=list[StudentResponse])
def get_all_student(db:Session=Depends(get_db)):
    students=db.query(Student).all()
    if not students:
        raise HTTPException(
                status_code=404,
                detail="Students not found")
    return students

@router.get("/student/{student_id}",response_model=StudentResponse)
def get_student_by_id(student_id:int,db:Session=Depends(get_db)):
    student=db.query(Student).filter(Student.id==student_id).first()
    if not student:
        raise HTTPException(
                        status_code=404,
                        detail="Student not found")
    return student

@router.put("/student/{student_id}",response_model=StudentResponse)
def update_student(student_id:int,update_student:StudentCreate,db:Session=Depends(get_db)):
    student=db.query(Student).filter(Student.id==student_id).first()
    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found")

    email=db.query(Student).filter(Student.email==update_student.email,Student.id!=student_id).first()
    if email:
           raise HTTPException(
            status_code=400,
            detail="Email already exits"
           ) 
    student.name=update_student.name
    student.email=update_student.email
    student.age=update_student.age
    student.department=update_student.department
    student.year=update_student.year
    student.cgpa=update_student.cgpa
    db.commit()
    db.refresh(student)
    return student

@router.delete("/student/{student_id}")
def delete_student(student_id:int,db:Session=Depends(get_db)):
    student=db.query(Student).filter(Student.id==student_id).first()
    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found")
    db.delete(student)
    db.commit()
    return {
        "message": "Student deleted successfully"
    }