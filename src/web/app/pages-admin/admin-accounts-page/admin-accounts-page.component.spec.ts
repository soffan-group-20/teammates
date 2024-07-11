import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingSpinnerModule } from '../../components/loading-spinner/loading-spinner.module';
import { AdminAccountsPageComponent } from './admin-accounts-page.component';
import { StatusMessageService } from '../../../services/status-message.service';
import { StudentService } from '../../../services/student.service';
import { AccountService } from '../../../services/account.service';
import { ErrorMessageOutput } from '../../error-message-output';
import { Subject } from 'rxjs';

const mockAccountService = {
  getAccount: jest.fn(() => new Subject()),
  deleteAccount: jest.fn()
};

const mockStatusMessageService = {
  showErrorToast: jest.fn()
};

const mockStudentService = {
  deleteStudent: jest.fn()
};

describe('AdminAccountsPageComponent', () => {
  let component: AdminAccountsPageComponent;
  let fixture: ComponentFixture<AdminAccountsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAccountsPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LoadingSpinnerModule,
      ],
      providers: [
        { provide: AccountService, useValue: mockAccountService },
        { provide: StatusMessageService, useValue: mockStatusMessageService, },
        { provide: StudentService, useValue: mockStudentService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error toast on failure to remove student from course', async () => {
    const googleId = 'GOOGLE_ID';
    const studentId = 'STUDENT_ID';
    const errorMsg = 'ERROR_MSG';

    let res: (value: unknown) => void;
    const didErrorToast = new Promise((r) => { res = r; });

    component.accountInfo = {
      googleId,
      name: 'NAME',
      email: 'EMAIL',
      readNotifications: {},
    };

    const observable = new Subject();
    const deleteStudent = jest.fn(() => observable);

    const showErrorToast = jest.fn((message: string, delay?: number) => {
      expect(message).toBe(errorMsg);
      expect(delay).toBeFalsy();

      res(null);
    });

    mockStudentService.deleteStudent.mockImplementationOnce(deleteStudent);
    mockStatusMessageService.showErrorToast.mockImplementationOnce(showErrorToast);

    component.removeStudentFromCourse(studentId);

    expect(deleteStudent).toHaveBeenCalled();

    const error: ErrorMessageOutput = {
      error: {
        message: errorMsg
      },
      status: -1
    };

    observable.error(error);
    await didErrorToast;

    expect(showErrorToast).toHaveBeenCalled()
  });
});
