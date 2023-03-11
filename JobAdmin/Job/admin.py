from django.contrib import admin

# Register your models here.
from .models import Job,Student,Teacher,Notice,User,Admin,Education,StudentJobEducation,JobInfo,Subject,BusinessAndStudent,ReadNotice,Resume,Business,BusinessPerson
admin.site.register(User)
admin.site.register(StudentJobEducation)