import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { PanelChevronModule } from '../../components/panel-chevron/panel-chevron.module';
import { InstructorHelpPageComponent } from './instructor-help-page.component';
import { InstructorHelpPageModule } from './instructor-help-page.module';
import { StudentsSectionQuestions } from './instructor-help-students-section/students-section-questions';

describe('InstructorHelpPageComponent', () => {
  let component: InstructorHelpPageComponent;
  let fixture: ComponentFixture<InstructorHelpPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule,
        PanelChevronModule,
        RouterTestingModule,
        InstructorHelpPageModule,
        NoopAnimationsModule,
        NgxPageScrollCoreModule,
        HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorHelpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll correctly', () => {
    const fn = jest.fn(function(target: string, timeout?: number) {
      expect(target).toBe(StudentsSectionQuestions.STUDENT_EDIT_DETAILS);
      expect(timeout).toBe(100);
    });

    component.scrollTo = fn;
    component.collapseStudentEditDetails();
    expect(fn).toHaveBeenCalled();
  });
});
