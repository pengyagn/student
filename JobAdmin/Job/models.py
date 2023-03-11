from django.db import models

# Create your models here.
class Job(models.Model):
    jid = models.AutoField(primary_key=True)
    businessName = models.CharField(max_length=255,verbose_name='企业名称')
    location = models.CharField(max_length=255,verbose_name='企业位置')
    jobName = models.CharField(max_length=255,verbose_name='招聘岗位')
    businessYear = models.CharField(max_length=255,verbose_name='工作经验')
    education = models.CharField(max_length=255,verbose_name='学历')
    businessType = models.CharField(max_length=255,verbose_name='工作类型')
    money = models.CharField(max_length=255,verbose_name='薪资')
    pubTime = models.CharField(max_length=255,verbose_name='发布时间')
    url = models.CharField(max_length=255,verbose_name='详细链接')
    bid = models.IntegerField(null=True)
    class Meta:
        verbose_name = '工作表'
        verbose_name_plural = verbose_name
        db_table = 'Job'
        ordering = ['jid']

class Student(models.Model):
    sid = models.AutoField(primary_key=True)
    sno = models.CharField(max_length=255,verbose_name='学号')
    name = models.CharField(max_length=255,verbose_name='姓名')
    age = models.IntegerField(max_length=20,verbose_name='年龄')
    clazz = models.CharField(max_length=255,verbose_name='班级')
    gender = models.CharField(max_length=255,verbose_name='性别')
    phone = models.CharField(max_length=255,verbose_name='电话')
    collage = models.CharField(max_length=255,verbose_name='学院')
    university = models.CharField(max_length=255,verbose_name='学校')
    major = models.CharField(max_length=255,null=True,verbose_name='专业')
    email = models.CharField(max_length=255,null=True,verbose_name='邮箱')
    class Meta:
        verbose_name = '学生表'
        verbose_name_plural = verbose_name
        db_table = 'Student'
        ordering = ['sid']

class Teacher(models.Model):
    tid = models.AutoField(primary_key=True)
    tno = models.CharField(max_length=255,verbose_name='教工号')
    name = models.CharField(max_length=255,verbose_name='姓名')
    age = models.IntegerField(max_length=20,verbose_name='年龄')
    gender = models.CharField(max_length=255,null=True,verbose_name='性别')
    phone = models.CharField(max_length=255,null=True,verbose_name='电话')
    clazz = models.CharField(max_length=255,verbose_name='班级')
    subject = models.CharField(max_length=255,verbose_name='学科')
    collage = models.CharField(max_length=255,verbose_name='学院')
    university = models.CharField(max_length=255,verbose_name='学校')
    class Meta:
        verbose_name = '教师表'
        verbose_name_plural = verbose_name
        db_table = 'Teacher'
        ordering = ['tid']

class User(models.Model):
    uid = models.AutoField(primary_key=True)
    uname = models.CharField(max_length=255,verbose_name='用户名')
    upasswd = models.CharField(max_length=255,verbose_name='密码')
    utype = models.CharField(max_length=255,verbose_name='用户类型') # 0代表管理员 1代表学生 2代表老师
    fkno = models.IntegerField()
    class Meta:
        verbose_name = '用户表'
        verbose_name_plural = verbose_name
        db_table = 'User'
        ordering = ['uid']


class Admin(models.Model):
    aid = models.AutoField(primary_key=True)
    aname = models.CharField(max_length=255,verbose_name='管理员姓名')
    phone = models.CharField(max_length=255,verbose_name='管理员电话')
    collage = models.CharField(max_length=255,verbose_name='管理员学院')
    university = models.CharField(max_length=255,verbose_name='所属大学')
    class Meta:
        verbose_name = '管理员表'
        verbose_name_plural = verbose_name
        db_table = 'Admin'
        ordering = ['aid']

class Education(models.Model):
    eid = models.AutoField(primary_key=True)
    education = models.CharField(max_length=255,verbose_name='升学学位')
    major = models.CharField(max_length=255,verbose_name='升学专业')
    university = models.CharField(max_length=255,verbose_name='升学学校')
    class Meta:
        verbose_name = '升学信息表'
        verbose_name_plural = verbose_name
        db_table = 'Education'
        ordering = ['eid']

class StudentJobEducation(models.Model):
    id = models.AutoField(primary_key=True)
    sid = models.IntegerField(null=True,verbose_name='学生id')
    jid = models.IntegerField(null=True,verbose_name='工作id')
    eid = models.IntegerField(null=True,verbose_name='升学id')
    class Meta:
        verbose_name = '学生就业或升学信息表'
        verbose_name_plural = verbose_name
        db_table = 'StudentJobEducation'
        ordering = ['id']

class JobInfo(models.Model):
    id = models.AutoField(primary_key=True)
    businessName=models.CharField(max_length=255,verbose_name='公司名称')
    location=models.CharField(max_length=255,verbose_name='公司位置')
    jobName=models.CharField(max_length=255,verbose_name='工作职位')
    businessType=models.CharField(max_length=255,verbose_name='公司类型')
    class Meta:
        verbose_name = '工作信息表'
        verbose_name_plural = verbose_name
        db_table = 'JobInfo'
        ordering = ['id']

class Notice(models.Model):
    nid = models.AutoField(primary_key=True)
    pubTime = models.CharField(max_length=255,verbose_name='发布时间')
    title = models.CharField(max_length=255,verbose_name='公告标题')
    desc = models.CharField(max_length=255,verbose_name='公告内容')
    tid = models.IntegerField(verbose_name='发布教师的id')

    class Meta:
        verbose_name = '公告表'
        verbose_name_plural = verbose_name
        db_table = 'Notice'
        ordering = ['nid']

class ReadNotice(models.Model):
    rid = models.AutoField(primary_key=True)
    nid = models.IntegerField(verbose_name='公告id')
    sid = models.IntegerField(verbose_name='学生id')
    class Meta:
        verbose_name = '是否已经阅读公告表'
        verbose_name_plural = verbose_name
        db_table = 'ReadNotice'
        ordering = ['rid']

class Resume(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(null=True,verbose_name='简历名称')
    reward = models.TextField(verbose_name='曾获奖励')
    skill = models.TextField(verbose_name='技能证书')
    evaluate = models.TextField(verbose_name='自我评价')
    practice = models.TextField(null=True,verbose_name='社会实践')
    sid = models.IntegerField(verbose_name='学生id')
    time = models.CharField(max_length=255,null=True,verbose_name='添加简历时间')
    class Meta:
        verbose_name = '简历表'
        verbose_name_plural = verbose_name
        db_table = 'Resume'
        ordering = ['id']

class Business(models.Model):
    id = models.AutoField(primary_key=True)
    businessName = models.CharField(max_length=255,verbose_name='企业名称')
    businessPerson = models.CharField(max_length=255,verbose_name='企业规模')
    businessType = models.CharField(max_length=255,verbose_name='企业类型')
    location = models.CharField(max_length=255,verbose_name='企业位置')
    class Meta:
        verbose_name = '企业信息表'
        verbose_name_plural = verbose_name
        db_table = 'Business'
        ordering = ['id']

class BusinessAndStudent(models.Model):
    id = models.AutoField(primary_key=True)
    bid = models.IntegerField()
    rid = models.IntegerField()
    jid = models.IntegerField(null=True)
    class Meta:
        db_table = 'BusinessAndStudent'
        ordering = ['id']

class BusinessPerson(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255,verbose_name='姓名')
    bno = models.CharField(max_length=255,verbose_name='工号')
    phone = models.CharField(max_length=255,verbose_name='电话')
    dept = models.CharField(max_length=255,verbose_name='部门')
    bid = models.IntegerField(verbose_name='所属企业id')

    class Meta:
        verbose_name = '企业用户信息表'
        verbose_name_plural = verbose_name
        db_table = 'BusinessPerson'
        ordering = ['id']

class College(models.Model):
    id = models.AutoField(primary_key=True)
    collegeName = models.CharField(max_length=255,verbose_name='学院名称')
    collegeAdmin = models.CharField(max_length=255,verbose_name='院长')

    class Meta:
        verbose_name = '学院信息表'
        verbose_name_plural = verbose_name
        db_table = 'College'
        ordering = ['id']


class Subject(models.Model):
    id = models.AutoField(primary_key=True)
    subjectName = models.CharField(max_length=255,verbose_name='专业信息')
    subjectAdmin = models.CharField(max_length=255,verbose_name='所属学院')

    class Meta:
        verbose_name = '专业信息表'
        verbose_name_plural = verbose_name
        db_table = 'Subject'
        ordering = ['id']