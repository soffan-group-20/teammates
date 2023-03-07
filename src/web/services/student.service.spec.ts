import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ResourceEndpoints } from '../types/api-const';
import { Course, Students } from '../types/api-output';
import { StudentUpdateRequest } from '../types/api-request';
import { CourseService } from './course.service';
import { HttpRequestService } from './http-request.service';
import { InstructorService } from './instructor.service';
import { StudentService } from './student.service';

const defaultStudentUpdateRequest: StudentUpdateRequest = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  team: '',
  section: '',
  comments: '',
  isSessionSummarySendEmail: true,
};

const studentCsvListTester:
    (courseId: string, service: StudentService, spyInstructorService: any, testFn: (str: string) => void) => void =
    (courseId: string, service: StudentService, spyInstructorService: any, testFn: (str: string) => void): void => {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const testData: any = require(`./test-data/${courseId}`);
      const course: Course = testData.course;
      const students: Students = testData.students;
      jest.spyOn(spyInstructorService, 'getCourseAsInstructor').mockReturnValue(of(course));
      jest.spyOn(service, 'getStudentsFromCourse').mockReturnValue(of(students));
      service.loadStudentListAsCsv({ courseId }).subscribe((csvResult: string) => testFn(csvResult));
    };

describe('StudentService', () => {
  let spyHttpRequestService: any;
  let spyInstructorService: any;
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [HttpRequestService, CourseService],
    });
    service = TestBed.inject(StudentService);
    spyHttpRequestService = TestBed.inject(HttpRequestService);
    spyInstructorService = TestBed.inject(InstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute PUT when updating students in a course', () => {
    const paramMap: Record<string, string> = {
      courseid: 'CS3281',
      studentemail: 'johndoe@gmail.com',
    };
    jest.spyOn(spyHttpRequestService, 'put');

    service.updateStudent({
      courseId: paramMap['courseid'],
      studentEmail: paramMap['studentemail'],
      requestBody: defaultStudentUpdateRequest,
    });

    expect(spyHttpRequestService.put)
        .toHaveBeenCalledWith(ResourceEndpoints.STUDENT, paramMap, defaultStudentUpdateRequest);
  });

  it('should execute DELETE when deleting all students in a course', () => {
    const paramMap: Record<string, string> = {
      courseid: 'CS3281',
      limit: '100',
    };
    jest.spyOn(spyHttpRequestService, 'delete');

    service.batchDeleteStudentsFromCourse({
      courseId: paramMap['courseid'],
      limit: parseInt(paramMap['limit'], 10),
    });

    expect(spyHttpRequestService.delete)
        .toHaveBeenCalledWith(ResourceEndpoints.STUDENTS, paramMap);
  });

  it('should execute POST when regenerating key of a student in a course', () => {
    const paramMap: Record<string, string> = {
      courseid: 'CS3281',
      studentemail: 'johndoe@gmail.com',
    };
    jest.spyOn(spyHttpRequestService, 'post');

    service.regenerateStudentKey(paramMap['courseid'], paramMap['studentemail']);

    expect(spyHttpRequestService.post)
        .toHaveBeenCalledWith(ResourceEndpoints.STUDENT_KEY, paramMap);
  });

  it('should generate course student list with section as csv', () => {
    studentCsvListTester('studentCsvListWithSection', service, spyInstructorService,
        (csvResult: string) => {
          expect(csvResult).toMatchSnapshot();
        });
  });

  it('should generate course student list without section as csv', () => {
    studentCsvListTester('studentCsvListWithoutSection', service, spyInstructorService,
        (csvResult: string) => {
          expect(csvResult).toMatchSnapshot();
        });
  });
});
