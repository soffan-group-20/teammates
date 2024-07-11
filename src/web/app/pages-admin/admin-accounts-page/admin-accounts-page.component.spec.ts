import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, Subject } from 'rxjs';
import { AccountService } from '../../../services/account.service';
import { Account } from 'src/web/types/api-output';
import { LoadingSpinnerModule } from '../../components/loading-spinner/loading-spinner.module';
import { AdminAccountsPageComponent } from './admin-accounts-page.component';

const mockAccountService = {
  getAccount: jest.fn(() => new Subject()),
  deleteAccount: jest.fn()
}

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
      providers: [{ provide: AccountService, useValue: mockAccountService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockAccountService.deleteAccount.mockReset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send right id to delete account service', () => {
    const googleId = 'GOOGLE_ID';

    component.accountInfo = {
      googleId,
      name: 'NAME',
      email: 'EMAIL',
      readNotifications: {},
    };

    const deleteAccount = jest.fn((instructorId: string): Observable<Account> => {
      expect(instructorId).toBe(googleId);
      return new Subject();
    });

    mockAccountService.deleteAccount.mockImplementationOnce(deleteAccount);
    component.deleteAccount();
    expect(deleteAccount).toHaveBeenCalled();
  });
});
